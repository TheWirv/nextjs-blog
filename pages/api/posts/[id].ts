// types
import type {NextApiRequest, NextApiResponse} from 'next';
// libs
import {getPostData} from 'lib';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: {id},
  } = req;
  const post = await getPostData(id as string, true);
  res.status(200).json(post);
};
