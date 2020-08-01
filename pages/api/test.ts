import fs from 'fs';
import path from 'path';
// types
import type {NextApiRequest, NextApiResponse} from 'next';

export default (req: NextApiRequest, res: NextApiResponse) => {
  const testText: string = req.body;

  fs.writeFileSync(path.join(process.cwd(), 'test.txt'), testText);
};
