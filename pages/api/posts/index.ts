// types
import type {NextApiRequest, NextApiResponse} from 'next';
// libs
import {getSortedPostsData} from 'lib';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const posts = await getSortedPostsData();
  res.status(200).json(posts);
};
