// Import necessary types from Next.js and your custom API.
import type { NextApiRequest, NextApiResponse } from "next";
import {
  Application,
  MasterApplication,
  MasterUniversities,
  Program,
} from "../../src/API";
import {
  getApplicationData,
  getMasterApplicationData,
  listAllMasterUniversities,
  listAllPrograms,
  listMasterScholarshipsOfApplicationId,
  listScholarshipsOfApplicationId,
} from "../../src/CustomAPI";
import { getCprFromToken } from "../../src/HelperFunctions";
import { API } from "aws-amplify";
import config from "../../src/aws-exports";

// Define the structure of the data returned by this API endpoint.
type Data = {
  application: MasterApplication | null;
  haveScholarship: boolean;
  universities: MasterUniversities[];
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
      universities: [],
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
      universities: [],
    });
  }

  // TODO: create a getCprFromToken for masterDev env
  // TODO: use the correct method
  // const { username: cpr } = await getCprFromToken(token ? `${token}` : null);
  const cpr = true;

  if (!cpr) {
    return res.status(422).json({
      application: null,
      haveScholarship: false,
      universities: [],
    });
  }

  // Use Promise.all to execute multiple asynchronous operations in parallel.
  const [applicationData, scholarships, universities] = await Promise.all([
    getMasterApplicationData(`${id}`).then((app) => {
      // TODO: check CPR to verify the ownership of the application
      return app ?? null;
      // return app ? (app.studentCPR === cpr ? app : null) : null;
    }),
    listMasterScholarshipsOfApplicationId({ applicationID: `${id}` }),
    listAllMasterUniversities(),
  ]);

  // Determine if scholarships are available for the application.
  const haveScholarship = scholarships ? scholarships.length > 0 : false;

  // Respond with the data object containing the results of all operations.
  res.status(200).json({
    application: applicationData,
    haveScholarship: haveScholarship,
    universities: universities ?? [],
  });
}
