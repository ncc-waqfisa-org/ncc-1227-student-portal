// Import necessary types from Next.js and your custom API.
import type { NextApiRequest, NextApiResponse } from "next";
import { Application, Program } from "../../src/API";
import {
  getApplicationData,
  listAllPrograms,
  listScholarshipsOfApplicationId,
} from "../../src/CustomAPI";
import { getCprFromToken } from "../../src/HelperFunctions";
import { API } from "aws-amplify";
import config from "../../src/aws-exports";

// Define the structure of the data returned by this API endpoint.
type Data = {
  application: Application | null;
  haveScholarship: boolean;
  programs: Program[];
};

// Define the API handler function.
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(405).json({
      application: null,
      haveScholarship: false,
      programs: [],
    });
  }

  API.configure({ ...config, ssr: true });
  const { id, token } = JSON.parse(req.body);
  // const { id, token } = req.query;/

  // Immediately respond with an error if the necessary parameters are not provided.
  if (!id || !token) {
    return res.status(422).json({
      application: null,
      haveScholarship: false,
      programs: [],
    });
  }

  const { username: cpr } = await getCprFromToken(token ? `${token}` : null);

  if (!cpr) {
    return res.status(422).json({
      application: null,
      haveScholarship: false,
      programs: [],
    });
  }

  // Use Promise.all to execute multiple asynchronous operations in parallel.
  const [applicationData, scholarships, programs] = await Promise.all([
    getApplicationData(`${id}`).then((app) => {
      return app ? (app.studentCPR === cpr ? app : null) : null;
    }),
    listScholarshipsOfApplicationId({ applicationId: `${id}` }),
    listAllPrograms(),
  ]);

  // Determine if scholarships are available for the application.
  const haveScholarship = scholarships ? scholarships.length > 0 : false;

  // Respond with the data object containing the results of all operations.
  res.status(200).json({
    application: applicationData,
    haveScholarship: haveScholarship,
    programs: programs ?? [],
  });
}
