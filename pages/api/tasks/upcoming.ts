import type { NextApiRequest, NextApiResponse } from "next";
import { getUpcomingTasks } from "../base";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const tasks = await getUpcomingTasks();
    res.status(200).json({ tasks });
  } 
  else {
    res.status(400).json({ msg: "invalid request method" });
  }
}
