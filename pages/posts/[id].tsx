import * as React from 'react';
import Head from 'next/head';
// components
import {Layout, Date} from 'components';
// types
import type {Post as PostType, PostId} from 'types';
import type {GetStaticProps, GetStaticPaths} from 'next';
// libs
import {getAllPostIds, getPostData} from 'lib';
// styles
import utilStyles from 'styles/utils.module.scss';

type Props = {
  postData: PostType;
};

const Post: React.FC<Props> = (props) => (
  <Layout>
    <Head>
      <title>{props.postData.title}</title>
    </Head>
    <article>
      <h1 className={utilStyles.headingXl}>{props.postData.title}</h1>
      <div className={utilStyles.lightText}>
        <Date dateString={props.postData.date} />
      </div>
      <div dangerouslySetInnerHTML={{__html: props.postData.contentHtml!}} />
    </article>
  </Layout>
);

export const getStaticProps: GetStaticProps<Props, PostId> = async ({params}) => {
  const postData = await getPostData(params.id, true);
  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths: GetStaticPaths<PostId> = async () => {
  const paths = getAllPostIds().map((id) => ({params: id}));
  return {
    paths,
    fallback: false,
  };
};

export default Post;
