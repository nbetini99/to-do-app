// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllTodos } from '../base';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const todos = await getAllTodos();

  res.status(200).json({ todos });
}
