import * as React from 'react';
import Head from 'next/head';
// components
import {Layout, Date} from 'components';
// types
import type {Post as PostType, PostIdParams} from 'types';
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

export const getStaticProps = async ({params}: PostIdParams) => {
  const postData = await getPostData(params.id, true);
  return {
    props: {
      postData,
    },
  };
};

export const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export default Post;
