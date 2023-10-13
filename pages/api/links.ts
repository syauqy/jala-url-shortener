import type { NextApiRequest, NextApiResponse } from "next";
import { redis } from "@/lib/redis";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { filterByFormula } = req.query;
  console.log(filterByFormula);
  // console.log(linkId);
  // let links = (await redis.get("links")) || [];

  const link = await fetch(
    `${process.env.NEXT_PUBLIC_AIRTABLE_URI}/links?filterByFormula=${filterByFormula}&&view=link-view`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_AIRTABLE_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );

  const response = await link.json();

  // // console.log(peserta.size);
  // const response = await events.json();
  res.status(200).json(response);
}
