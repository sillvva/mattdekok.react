import Head from "next/head";
import { PropsWithChildren } from "react";

type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  articleMeta?: object;
};

const PageMeta = (props: PropsWithChildren<MetaProps>) => {
  const dtitle = props.title ? `${props.title} - Matt DeKok` : "Matt DeKok";
  const description = props.description || "Experienced full stack web developer with a demonstrated history of working in the wireless industry.";
  const ogProperties: any = {
    title: dtitle,
    description: description,
    image: `https://matt.dekok.app${props.image || "/images/preview-me2.jpg"}`,
    url: "https://matt.dekok.app"
  };
  const twProperties: any = {
    site: "@sillvvasensei",
    card: "summary_large_image",
    ...ogProperties
  };
  const articleProps: any = {
    ...props.articleMeta
  };

  return (
    <Head>
      <title>{dtitle}</title>
      <meta name="description" content={description} />
      <link rel="apple-touch-icon" href={`${ogProperties.url}/icon_x128.png`}></link>
      {Object.keys(articleProps).map(t => {
        return <meta key={`article:${t}`} property={`article:${t}`} content={articleProps[t]} />;
      })}
      {Object.keys(ogProperties).map(t => {
        return <meta key={`og:${t}`} name={t} property={`og:${t}`} content={ogProperties[t]} />;
      })}
      {Object.keys(twProperties).map(t => {
        return <meta key={`tw:${t}`} name={`tw:${t}`} content={twProperties[t]} />;
      })}
    </Head>
  );
};

export default PageMeta;
