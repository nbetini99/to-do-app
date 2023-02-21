import type { NextApiRequest, NextApiResponse } from 'next';
import { createTodo } from '../base';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  if (req.method === "POST") {
    const newTodo = await createTodo(JSON.parse(req.body));
    res.status(200).json({ newTodo });
  } 
  else {
    res.status(400).json({ msg: "invalid request method" });
  }
}