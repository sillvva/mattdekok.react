import type { NextPage } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import { readFile } from "node:fs/promises";
import path from 'path';
import ReactMarkdown from 'react-markdown';
import matter from 'gray-matter';
import remarkGfm from 'remark-gfm';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import atomDark from 'react-syntax-highlighter/dist/cjs/styles/prism/atom-dark';
import ts from 'react-syntax-highlighter/dist/cjs/languages/prism/typescript';
import js from 'react-syntax-highlighter/dist/cjs/languages/prism/javascript';
import yaml from 'react-syntax-highlighter/dist/cjs/languages/prism/yaml';
import json from 'react-syntax-highlighter/dist/cjs/languages/prism/json';

import { menuItems } from '../../store/main-layout.context';
import Layout from '../../layouts/layout';
import PageHeader from '../../components/page-header'
import Page from '../../components/page';
import { PostProps } from '../../components/blog';
import PageMeta from '../../components/meta';
// import CodePenEmbed from '../../components/codepen';
import styles from '../../styles/Blog.module.scss';

SyntaxHighlighter.registerLanguage('js', js);
SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('ts', ts);
SyntaxHighlighter.registerLanguage('typescript', ts);
SyntaxHighlighter.registerLanguage('yml', yaml);
SyntaxHighlighter.registerLanguage('yaml', yaml);
SyntaxHighlighter.registerLanguage('json', json);

interface ServerProps {
  data: PostProps;
  content: string;
}

const Blog: NextPage<ServerProps> = (props: PropsWithChildren<ServerProps>) => {
  const { data, content } = props;

  const renderers = {
    p(paragraph: any) {
      const { node } = paragraph;

      if (node.children[0].tagName === 'img') {
        const image = node.children[0];

        return (
          <figure className={styles.BlogFigure}>
            <a href={image.properties.src} target="_blank" rel="noreferrer noopener" className={styles.BlogImage}>
              <Image
                src={image.properties.src}
                alt={image.alt}
                layout="fill"
                objectFit="contain"
              />
            </a>
            <figcaption>Click to open full screen</figcaption>
          </figure>
        );
      }

      return <p>{paragraph.children}</p>;
    },

    h1(h: any) {
      const { children } = h;
      const text = flattenChildren(children);
      return <h1 id={text.replace(/[^a-z]{1,}/gi, '-').toLowerCase()}>{children}</h1>
    },

    h2(h: any) {
      const { children } = h;
      const text = flattenChildren(children);
      return <h2 id={text.replace(/[^a-z]{1,}/gi, '-').toLowerCase()}>{children}</h2>
    },

    h3(h: any) {
      const { children } = h;
      const text = flattenChildren(children);
      return <h3 id={text.replace(/[^a-z]{1,}/gi, '-').toLowerCase()}>{children}</h3>
    },

    a(anchor: any) {
      const { href, children } = anchor;
      const isExternal = href.startsWith('http');
      return (
        <Link href={href}>
          <a target={isExternal ? '_blank' : ''} rel={isExternal ? 'noreferrer noopener' : ""}>{children}</a>
        </Link>
      )
    },

    // pre(pre: any) {
    //   const { node, children } = pre;
    //   if (node.children[0].tagName === 'code') {
    //     const code = node.children[0];
    //     const { properties, children } = code;
    //     const { className } = properties;
    //     const { value } = children[0];
    //     const language = ((className || [""])[0] || "").split('-')[1];
    //     if (language == "codepen") {
    //       try {
    //         const codepen = JSON.parse(value.trim());
    //         return <CodePenEmbed title={codepen.title} user={codepen.user} hash={codepen.hash} />
    //       }
    //       catch (err) {
    //         return <code>{children}</code>;
    //       }
    //     }
    //   }
    //   return <code>{children}</code>;
    // },

    code(code: any) {
      const { className, children } = code;
      const language = (className || "").split('-')[1];
      if (!language) return <code>{children}</code>;
      if (language == "codepen") return <code>{children}</code>;
      return (
        <SyntaxHighlighter
          style={atomDark}
          language={language}
        >{children}</SyntaxHighlighter>
      );
    },
  }

  return (
    <Layout>
      <PageMeta title={data.title} description={data.description} image={data.image || ""} />
      <PageHeader title={data.title} items={menuItems} smallTitle={true} />
      <Page.Body>
        <Page.Article className={[styles.BlogArticle, 'w-full xl:w-9/12 2xl:w-8/12'].join(' ')}>
          <Page.Section className="aspect-video" bgImage={data.image}>
          </Page.Section>
          <Page.Section>
            <p className="mb-4 text-gray-400" aria-label="Date published">{data.date} {data.updated && `(Updated: ${data.updated})`}</p>
            <div className={styles.BlogContent}>
              <ReactMarkdown components={renderers} remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
            <p className="mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {data.tags.map((tag, i) => (
                <span className="rounded-full bg-gray-700 text-white py-1 px-3" key={i}>{tag}</span>
              ))}
            </div>
          </Page.Section>
        </Page.Article>
      </Page.Body>
    </Layout>
  )
}

export default Blog

export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;

  const contentPath = path.join(process.cwd(), 'content');
  const mdFile = await readFile(`${contentPath}/${slug}.md`, "utf8");
  const { content, data } = matter(mdFile);

  for (let key in data) {
    if (data[key] instanceof Date) {
      data[key] = data[key].toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    }
  }
  // const data: PostProps[] = JSON.parse(contentFiles);

  return {
    props: {
      content: content,
      data: data
    }
  }
}

const flattenChildren: any = (children: any[]) => {
  return (children || []).map(c => {
    if (typeof c == "object") return flattenChildren(c.props.children);
    return c;
  }).join(' ');
};