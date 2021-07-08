import React from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { parseISO, format } from "date-fns";
import Layout from "../../components/layout";
import remark from "remark";
import html from "remark-html";
import prism from "remark-prism";
import { motion } from "framer-motion";
import { stagger, fadeInUp } from "../../containers/framerAnimations";
import { BlogPost } from "../../containers/Interfaces/Interface";

export interface AllBlogProps {
  blogDetails: BlogPost;
  articleContent: string;
}

const BlogPage: NextPage<AllBlogProps> = ({ articleContent, blogDetails }) => {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={blogDetails.title} description={blogDetails.title}>
      <Head>
        <link
          href="https://unpkg.com/prismjs@0.0.1/themes/prism-okaidia.css"
          rel="stylesheet"
        />
      </Head>
      {blogDetails && (
        <article
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-gray-300"
          itemID="#"
          itemScope
          itemType="http://schema.org/BlogPosting"
        >
          <motion.div
            initial="initial"
            animate="animate"
            variants={stagger}
            className="w-full mx-auto mb-8 text-left"
          >
            {blogDetails.cover_image && (
              <motion.img
                variants={fadeInUp}
                src={blogDetails.cover_image}
                className="object-fit h-auto md:object-cover w-full md:max-h-64 bg-center rounded-lg"
                alt="Blog Cover"
              />
            )}
            <motion.h1
              variants={fadeInUp}
              className="px-4 sm:px-0 mt-6 mb-6 text-3xl font-bold leading-tight dark:text-white md:text-4xl"
              itemProp="headline"
              title={blogDetails.title}
            >
              {blogDetails.title}
            </motion.h1>

            <div className="flex justify-between px-4 sm:px-0">
              <motion.div variants={fadeInUp} className="flex items-center ">
                <div className="avatar ">
                  <img
                    className="rounded-full w-14 h-14"
                    src={blogDetails.user.profile_image_90}
                    alt={blogDetails.user.name}
                  />
                </div>
                <div className="ml-2">
                  <p className=" font-semibold "> {blogDetails.user.name}</p>
                  <p className="text-sm  dark:text-gray-400">
                    {format(
                      parseISO(blogDetails.published_at),
                      "MMMM dd, yyyy"
                    )}
                  </p>
                </div>
              </motion.div>
              <motion.div variants={fadeInUp} className="self-center">
                <p className="text-sm flex justify-end  dark:text-gray-400">
                  {blogDetails.public_reactions_count}&nbsp;
                  <span role="img" aria-label="Heart">
                    💖
                  </span>
                </p>
                {/* <p className="text-gray-400 flex justify-end text-sm">{blogDetails.page_views_count} views</p> */}
              </motion.div>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="px-4 sm:px-0 w-full prose dark:prose-dark prose-indigo 2xl:prose-lg md:w-full"
            dangerouslySetInnerHTML={{ __html: articleContent }}
          />
        </article>
      )}
    </Layout>
  );
};

const getAllBlogs = async () => {
  const res = await fetch("https://dev.to/api/articles?username=m_ahmad");

  // const res = await fetch('https://dev.to/api/articles/me/published', {
  //   headers: { 'api-key': '' || '' },
  // })

  if (res.status < 200 || res.status >= 300) {
    throw new Error(
      `Error fetching... Status code: ${res.status}, ${res.statusText}`
    );
  }
  const data = await res.json();
  return data;
};

const markdownToHtml = async (markdown: string) => {
  const result = await remark().use(html).use(prism).process(markdown);
  return result.toString();
};

export const getStaticPaths: GetStaticPaths = async () => {
  const devData: BlogPost[] = await getAllBlogs();

  const paths = devData.map(data => ({
    params: { slug: data?.slug }
  }));

  return {
    paths,
    fallback: true
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const devData: BlogPost[] = await getAllBlogs();

  const selectedBlog = devData.filter(data => data?.slug === params?.slug);

  // const blogObj = selectedBlog[0]

  const res = await fetch(`https://dev.to/api/articles/${selectedBlog[0]?.id}`);
  const blogObj = await res.json();

  const remarkContent = await markdownToHtml(blogObj.body_markdown);

  if (!devData) {
    return {
      notFound: true
    };
  }

  return {
    props: {
      articleContent: remarkContent,
      blogDetails: blogObj
    }, // will be passed to the page component as props
    revalidate: 1
  };
};

export default BlogPage;
