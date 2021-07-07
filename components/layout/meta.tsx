import Head from "next/head";

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta charSet="utf-8" />
      <meta name="keywords" content={keywords} />
      <title>{title}</title>
      <meta name="title" property="og:title" content={title} />
      <meta
        name="description"
        property="og:description"
        content={description}
      />
    </Head>
  );
};

Meta.defaultProps = {
  title: "Muhammad Ahmad - Full Stack Developer",
  keywords: "web development, programming, web design",
  description: "Software Engineer. Lover of web and opensource."
};

export default Meta;
