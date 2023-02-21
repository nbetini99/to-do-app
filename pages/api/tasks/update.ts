import type { NextApiRequest, NextApiResponse } from 'next';
import { updateTask } from '../base';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method === "PUT") {
    updateTask(JSON.parse(req.body));
    res.status(200).json({ msg: "Task updated successfully" });
  } 
  else {
    res.status(400).json({ msg: "invalid request method" });
  }
}