// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message?: string;
};

type InputData = { cpr: string; newEmail: string; token: string };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "PUT") {
    res.status(405).json({ message: "Method Not Allowed" });
  }

  const data: InputData = JSON.parse(req.body);
  console.log("🚀 ~ data:", data);

  const resultData = await fetch(
    "https://sb87s08fch.execute-api.us-east-1.amazonaws.com/default/email",
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(data.token && { Authorization: `Bearer ${data.token}` }),
      },
      body: JSON.stringify({ username: data.cpr, newEmail: data.newEmail }),
    }
  )
    .then(async (result) => {
      const jsonData = await result.json();

      console.log("🚀 ~ .then ~ jsonData:", jsonData);
      if (result.ok) {
        return {
          d: jsonData,
          isError: false,
        };
      } else {
        return {
          d: jsonData,
          isError: true,
        };
      }
    })
    .catch((error) => {
      return {
        d: error.message,
        isError: true,
      };
    });

  res.status(resultData.isError ? 500 : 200).json(resultData.d);
}
