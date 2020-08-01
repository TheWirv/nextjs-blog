import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
// types
import type {Post, PostId} from 'types';

type MatterData = Pick<Post, 'date' | 'title'>;

const postsDirectory = path.join(process.cwd(), 'posts');

export const getSortedPostsData = async () => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = await Promise.all(
    fileNames.map((fileName) => getPostData(fileName.replace(/\.md$/, '')))
  );

  // Sort posts by date
  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
};

export const getAllPostIds = (): PostId[] => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    id: fileName.replace(/\.md$/, ''),
  }));
};

export const getPostData = async (id: string, includeContent?: boolean): Promise<Post> => {
  let post: Post;
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);
  let contentHtml: string | undefined;

  post = {
    id,
    ...(matterResult.data as MatterData),
  };

  if (includeContent) {
    // Use remark to convert markdown into HTML string
    const processedContent = await remark().use(html).process(matterResult.content);
    contentHtml = processedContent.toString();
    post = {
      ...post,
      contentHtml,
    };
  }

  // Combine the data with the id
  return post;
};
