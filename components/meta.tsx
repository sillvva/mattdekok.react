import Head from 'next/head';
import React from 'react';

interface MetaProps {
  title?: string;
  description?: string;
  image?: string;
}

const PageMeta = (props: React.PropsWithChildren<MetaProps>) => {
  const dtitle = props.title ? `${props.title} - Matt DeKok` : 'Matt DeKok';
  const description = props.description || "Experienced full stack web developer with a demonstrated history of working in the wireless industry.";
  const ogProperties: any = {
    title: dtitle,
    description: description,
    image: `https://matt.dekok.app${props.image || '/images/preview-me2.jpg'}`,
    url: "https://matt.dekok.app",
  };
  const twProperties: any = {
    site: '@sillvvasensei',
    card: 'summary_large_image',
    ...ogProperties
  }
  const properties: any = { og: ogProperties, tw: twProperties };

  return (
    <Head>
      <title>{dtitle}</title>
      <meta name="description" content={description} />
      {Object.keys(properties).map((m) => {
        return Object.keys(properties[m]).map((t) => {
          return <meta key={`${m}:${t}`} name={`${m}:${t}`} property={`${m}:${t}`} content={properties[m][t]} />;
        });
      })}
    </Head>
  )
}

export default PageMeta;
