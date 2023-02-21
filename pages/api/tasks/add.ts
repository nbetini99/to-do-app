import type { NextApiRequest, NextApiResponse } from 'next';
import { createTask } from '../base';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method === "POST") {
    const newTask = await createTask(JSON.parse(req.body));
    res.status(200).json({ newTask });
  } 
  else {
    res.status(400).json({ msg: "invalid request method" });
  }
}