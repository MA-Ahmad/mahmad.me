import Layout from "components/layout";
import { GetStaticProps, NextPage } from "next";
import { Props } from "../containers/Interfaces/Interface";
import Main from "components/Landing/header";
import LatestArticles from "components/Landing/LatestArticles";

const title = "Hey, I'm Ahmad 👋";
const subtitle = "I'm a software developer.";

const Home: NextPage<Props> = props => {
  const { posts } = props;

  return (
    <Layout title={title} description={subtitle}>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 dark:text-gray-300">
        <div className="md:space-y-20">
          <Main />
          <LatestArticles posts={posts} />
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
    props: { posts },
    revalidate: 1
  };
};

export default Home;
