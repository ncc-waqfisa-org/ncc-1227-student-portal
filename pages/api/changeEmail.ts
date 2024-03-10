// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {
  LambdaClient,
  InvokeCommand,
  InvokeCommandInput,
  InvokeCommandOutput,
  LambdaClientConfig,
} from "@aws-sdk/client-lambda"; // ES Modules import
import config from "../../src/aws-exports";

type Data = {
  output: InvokeCommandOutput;
};

type InputData = { cpr: string; newEmail: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const data: InputData = JSON.parse(req.body);
  console.log("🚀 ~ data:", data);

  const lambdaConfig: LambdaClientConfig = {
    region: config.aws_project_region,
    credentials: {
      accessKeyId: process.env.CONFIG_ACCESS_KEY_ID ?? "",
      secretAccessKey: process.env.CONFIG_SECRET_ACCESS_KEY ?? "",
    },
  };
  // const { LambdaClient, InvokeCommand } = require("@aws-sdk/client-lambda"); // CommonJS import
  const client = new LambdaClient(lambdaConfig);
  const input: InvokeCommandInput = {
    // InvocationRequest
    FunctionName: "updateStudentEmail-staging", // required
    InvocationType: "RequestResponse",
    // LogType: "None" || "Tail",
    // ClientContext: "STRING_VALUE",
    Payload: JSON.stringify({
      data,
    }),
    // Payload: "BLOB_VALUE",
    // Qualifier: "STRING_VALUE",
  };
  const command = new InvokeCommand(input);
  const response = await client
    .send(command)
    .then((v) => {
      console.log(v);

      return v;
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
  console.log("🚀 ~ response:", response);

  res.status(200).json({
    output: response,
  });
}
