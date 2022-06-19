import Head from "next/head";
import { PropsWithChildren, useMemo } from "react";
import { useTheme } from "next-themes";

type MetaProps = {
  title?: string;
  description?: string;
  image?: string;
  articleMeta?: object;
};

const themeColors: { [key: string]: string } = {
  dark: "#00aa99",
  blue: "#32b2e8",
  light: "#0070e7"
};

const PageMeta = (props: PropsWithChildren<MetaProps>) => {
  const { theme } = useTheme();
  const color = useMemo(() => themeColors[theme || "dark"] ?? "#111", [theme]);

  const dtitle = useMemo(() => props.title ? `${props.title} - Matt DeKok` : "Matt DeKok", [props.title]);
  const description = props.description || "Experienced full stack web developer with a demonstrated history of working in the wireless industry.";
  const ogProperties: any = useMemo(() => ({
    title: dtitle,
    description: description,
    image: `https://matt.dekok.app${props.image || "/images/preview-me2.jpg"}`,
    url: "https://matt.dekok.app"
  }), [props.image, dtitle, description]);
  const twProperties: any = useMemo(() => ({
    site: "@sillvvasensei",
    card: "summary_large_image",
    ...ogProperties
  }), [ogProperties]);
  const articleProps: any = useMemo(() => ({
    ...props.articleMeta
  }), [props.articleMeta]);

  return (
    <Head>
      <title>{dtitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.png" />
      <link rel="apple-touch-icon" href={`${ogProperties.url}/icon_x128.png`}></link>
      <link rel="manifest" href="/manifest.webmanifest" />

      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="msapplication-TileColor" content={color} />
      <meta name="msapplication-tap-highlight" content="no" />
      <meta name="theme-color" content={color} />
      {useMemo(() => Object.keys(articleProps).map(t => {
        return <meta key={`article:${t}`} property={`article:${t}`} content={articleProps[t]} />;
      }), [articleProps])}
      {useMemo(() => Object.keys(ogProperties).map(t => {
        return <meta key={`og:${t}`} name={t} property={`og:${t}`} content={ogProperties[t]} />;
      }), [ogProperties])}
      {useMemo(() => Object.keys(twProperties).map(t => {
        return <meta key={`tw:${t}`} name={`tw:${t}`} content={twProperties[t]} />;
      }), [twProperties])}
    </Head>
  );
};

export default PageMeta;
