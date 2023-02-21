import { deleteTask } from '../base';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
  try {
    const { query, method } = req
    const { taskid } = query
    
    if(method === 'DELETE') {
        deleteTask(taskid);
        res.status(200).json({ msg: "Task is deleted successfully" });
    }    
  } 
  catch {
    res.status(400).json({ msg: "invalid request method" });
  }
}