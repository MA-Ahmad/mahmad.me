import Layout from "components/layout";
import { GetStaticProps, NextPage } from "next";
import { Props } from "../containers/Interfaces/Interface";
import { parseISO, format } from "date-fns";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

const title = "Blog ✍️";
const subtitle =
  "I share anything that may help others, technologies I'm using and cool things I've made.";

const Blog: NextPage<Props> = props => {
  const { posts } = props;

  return (
    <Layout title={title} description={subtitle}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-gray-300">
        <div className="divide-y divide-gray-800">
          <div className="pb-6 space-y-2 md:space-y-5 ">
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
              {title}
            </h1>
            <p className="font-normal tracking-tight sm:w-9/12 md:w-10/12 lg:w-9/12 text-base md:text-lg">
              {subtitle}
            </p>
          </div>
          <div className="grid grid-cols-1">
            <ul>
              <AnimatePresence>
                {posts.length &&
                  posts.map((post, i) => (
                    <motion.li
                      initial="hidden"
                      animate="visible"
                      variants={{
                        hidden: i => ({
                          opacity: 0,
                          y: -30 * i
                        }),
                        visible: i => ({
                          opacity: 1,
                          y: 0,
                          transition: {
                            delay: i * 0.1
                          }
                        })
                      }}
                      custom={i}
                      key={post.slug}
                      className="py-1"
                    >
                      <Link href={`/blog/${post.slug}`}>
                        <a>
                          <div className="w-full hover:bg-gray-200 p-5 rounded-sm dark:hover:bg-gray-900">
                            <div className="flex flex-col md:flex-row justify-between">
                              <h4 className="text-lg md:text-xl font-semibold w-full text-gray-900 dark:text-gray-100">
                                {post.title}
                              </h4>
                              {/* <p className="text-gray-500 text-left md:text-right w-32 mb-4 md:mb-0">
                                {post.page_views_count} views
                              </p> */}
                            </div>
                            <p className="text-sm mb-2">
                              <span>
                                {format(
                                  parseISO(post.published_at),
                                  "MMMM dd, yyyy"
                                )}
                              </span>
                              <span className="px-1">-</span>
                              <span>{post.tag_list.join(", ")}</span>
                            </p>
                            <p className="text-gray-600 dark:text-gray-400">
                              {post.description}
                            </p>
                          </div>
                        </a>
                      </Link>
                    </motion.li>
                  ))}
              </AnimatePresence>
            </ul>
          </div>
        </div>
      </section>
    </Layout>
  );
};

const getPosts = async () => {
  const res = await fetch("https://dev.to/api/articles?username=m_ahmad");
  const posts = await res.json();

  return posts;
};

export const getStaticProps: GetStaticProps = async () => {
  const posts = await getPosts();

  if (!posts) {
    return {
      notFound: true
    };
  }

  return {
    props: { posts }, // will be passed to the page component as props
    revalidate: 1
  };
};

export default Blog;
