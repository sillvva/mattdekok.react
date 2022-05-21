import type { NextPage } from 'next'
import Link from 'next/link';
import Image from 'next/image';
import { PropsWithChildren } from 'react';
import axios from 'axios';
import { readFileSync, writeFileSync, rmSync, existsSync, statSync, mkdirSync } from "node:fs";
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

import { ref, getDownloadURL, firebaseConfig, getMetadata } from '../../functions/firebase'
import { menuItems } from '../../store/main-layout.context';
import Layout from '../../layouts/layout';
import PageHeader from '../../components/page-header'
import Page from '../../components/page';
import { blogStyles, PostProps } from '../../components/blog';
import PageMeta from '../../components/meta';
import ReactCodepen from '../../components/codepen';

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
          <figure className={blogStyles.BlogFigure}>
            <a href={image.properties.src} target="_blank" rel="noreferrer noopener" className={blogStyles.BlogImage}>
              <Image src={image.properties.src} alt={image.alt} layout="fill" objectFit="contain" />
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
      return (
        <h1>
          <span id={text.replace(/[^a-z]{1,}/gi, '-').toLowerCase()}></span>
          {children}
        </h1>
      )
    },

    h2(h: any) {
      const { children } = h;
      const text = flattenChildren(children);
      return (
        <h2>
          <span id={text.replace(/[^a-z]{1,}/gi, '-').toLowerCase()}></span>
          {children}
        </h2>
      )
    },

    h3(h: any) {
      const { children } = h;
      const text = flattenChildren(children);
      return (
        <h3>
          <span id={text.replace(/[^a-z]{1,}/gi, '-').toLowerCase()}></span>
          {children}
        </h3>
      )
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

    pre(pre: any) {
      const { node, children } = pre;
      if (node.children[0].tagName === 'code') {
        const code = node.children[0];
        const { properties, children } = code;
        const { className } = properties;
        const { value } = children[0];
        const language = ((className || [""])[0] || "").split('-')[1];
        if (language == "codepen") {
          try {
            const codepen = JSON.parse(value.trim());
            return <ReactCodepen {...codepen} />
          }
          catch (err) {
            return <code>{children}</code>;
          }
        }
      }
      return <code>{children}</code>;
    },

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
        <Page.Article className={[blogStyles.BlogArticle, 'w-full xl:w-9/12 2xl:w-8/12'].join(' ')}>
          {!data.full && <Page.Section className="aspect-video" bgImage={data.image} />}
          <Page.Section>
            <p className="mb-4 text-gray-400" aria-label="Date published">{data.date} {data.updated && `(Updated: ${data.updated})`}</p>
            <div className={blogStyles.BlogContent}>
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

/**
 * Use local file if it exists. If it does not, fetch it from Firebase Storage, and store it.
 * If the file in Firebase Storage is newer, fetch it and store it.
 * With this, only the latest version should show, and this should reduce the calls to Firebase Storage.
 * 
 * @param context 
 * @returns Server Side Properties
 */
export async function getServerSideProps(context: any) {
  const { params } = context;
  const { slug } = params;

  // Local directory
  let dirPath = path.join(process.cwd(), 'content');
  // Vercel directory, because the cwd() directory is read-only
  if (!existsSync(dirPath) && existsSync('/tmp')) dirPath = '/tmp';
  const filePath = `${dirPath}/${slug}.md`;

  const storageRef = ref(`${firebaseConfig.blogContent}/${slug}.md`);
  const meta = await getMetadata(storageRef);

  let result = { data: "" };
  let write = false;
  if (existsSync(filePath)) {
    const stat = statSync(filePath);
    const tdiff = (new Date(meta.timeCreated).getTime() - stat.ctime.getTime()) / 1000;
    // console.log({
    //   file: slug,
    //   storageDate: new Date(meta.timeCreated),
    //   localDate: stat.ctime
    // });
    if (tdiff > 0) {
      write = true;
      rmSync(filePath);
    }
    else result.data = readFileSync(filePath, 'utf8');
  }
  else write = true;

  if (write) {
    const url = await getDownloadURL(storageRef);
    result = await axios.get(url);
    writeFileSync(filePath, result.data);
  }

  const { content, data } = matter(result.data);
  for (let key in data) {
    if (data[key] instanceof Date) {
      data[key] = data[key].toLocaleDateString('en-us', { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    }
  }

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