// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { getAllTasks } from '../base';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const tasks = await getAllTasks();
  res.status(200).json({ tasks });
}