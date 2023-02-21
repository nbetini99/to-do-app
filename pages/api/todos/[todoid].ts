import type { NextApiRequest, NextApiResponse } from 'next';
import { getTasksByTodo, getTodo } from '../base';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  try {
    const { query } = req
    const { todoid } = query
    const todo = await getTodo(todoid);
    const tasks = await getTasksByTodo(todoid);
    res.status(200).json({ todo, tasks });
  } catch {
    res.status(400).json({ msg: "invalid request method" });
  }
}