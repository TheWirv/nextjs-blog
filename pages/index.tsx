import * as React from 'react';
import Head from 'next/head';
import Link from 'next/link';
// types
import type {Post} from '../types';
// components
import {Layout, siteTitle, Date} from 'components';
// libs
import {getSortedPostsData} from 'lib/posts';
// styles
import utilStyles from 'styles/utils.module.scss';

type Props = {
  allPostsData: Post[];
};

const Home: React.FC<Props> = (props) => (
  <Layout home>
    <Head>
      <title>{siteTitle}</title>
    </Head>
    <section className={utilStyles.headingMd}>
      <p>[Your Self Introduction]</p>
      <p>
        (This is a sample website - you’ll be building a site like this on{' '}
        <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
      </p>
    </section>
    <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {props.allPostsData.map((post) => (
          <li className={utilStyles.listItem} key={post.id}>
            <Link href="/posts/[id]" as={`/posts/${post.id}`}>
              <a>{post.title}</a>
            </Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={post.date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  </Layout>
);

export const getStaticProps = async () => {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};

export default Home;
