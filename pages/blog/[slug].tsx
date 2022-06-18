import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import type { ComponentType } from "react";
import { readFileSync, rmSync, existsSync, statSync } from "node:fs";
import ReactMarkdown from "react-markdown";
import matter from "gray-matter";
import remarkGfm from "remark-gfm";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";

import type { NextPageWithLayout } from "../_app";
import MainLayout from "../../layouts/main";
import Page from "../../components/layouts/main/page";
import { blogStyles, PostProps } from "../../components/blog";
import { firebaseConfig, storage } from "../../lib/func";
import { fetchPosts } from "../../lib/blog";
import { getContentDir } from "../../store/content";
import type { PostData } from "../api/get-posts";
import PageMessage from "../../components/page-message";

const ReactCodepen = dynamic(() => import("../../components/codepen"));
const SyntaxHighlighter: ComponentType<any> = dynamic(() => import("react-syntax-highlighter").then((mod: any) => mod.PrismLight));

type ServerProps = {
  data: PostProps;
  content: string;
};

const Blog: NextPageWithLayout<ServerProps> = props => {
  const { data, content } = props;

  try {
    if (!data) throw new Error("Could not load post");

    const renderers = {
      p(paragraph: any) {
        const { node } = paragraph;

        if (node.children[0].tagName === "img") {
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
            <span id={text.replace(/[^a-z0-9]{1,}/gi, "-").toLowerCase()}></span>
            {children}
          </h1>
        );
      },

      h2(h: any) {
        const { children } = h;
        const text = flattenChildren(children);
        return (
          <h2>
            <span id={text.replace(/[^a-z0-9]{1,}/gi, "-").toLowerCase()}></span>
            {children}
          </h2>
        );
      },

      h3(h: any) {
        const { children } = h;
        const text = flattenChildren(children);
        return (
          <h3>
            <span id={text.replace(/[^a-z0-9]{1,}/gi, "-").toLowerCase()}></span>
            {children}
          </h3>
        );
      },

      a(anchor: any) {
        const { href, children } = anchor;
        const isExternal = href.startsWith("http");
        return (
          <Link href={href} scroll={false}>
            <a target={isExternal ? "_blank" : ""} rel={isExternal ? "noreferrer noopener" : ""}>
              {children}
            </a>
          </Link>
        );
      },

      pre(pre: any) {
        const { node, children } = pre;
        try {
          if (node.children[0].tagName === "code") {
            const code = node.children[0];
            const { properties, children } = code;
            const { className } = properties;
            const { value } = children[0];
            const language = ((className || [""])[0] || "").split("-")[1];
            if (language == "codepen") {
              const codepen = JSON.parse(value.trim());
              return <ReactCodepen {...codepen} />;
            }
          }
        } catch (err) {
          console.log(err);
        }
        return <pre>{children}</pre>;
      },

      code(code: any) {
        const { className, children } = code;
        const language = (className || "").split("-")[1];
        if (!language) return <code>{children}</code>;
        if (language == "codepen") return <code>{children}</code>;
        return (
          <SyntaxHighlighter style={atomDark} language={language}>
            {children}
          </SyntaxHighlighter>
        );
      }
    };

    return (
      <Page.Body>
        <Page.Article className={[blogStyles.BlogArticle, "w-full xl:w-9/12 2xl:w-8/12"].join(" ")}>
          {!data.full && (
            <div className="aspect-video relative">
              <Image src={data.image} alt={"Cover"} layout="fill" objectFit="cover" priority />
            </div>
          )}
          <Page.Section>
            <p className="mb-4 text-gray-400" aria-label="Date published">
              {data.date} {data.updated && `(Updated: ${data.updated})`}
            </p>
            <div className={blogStyles.BlogContent}>
              <ReactMarkdown components={renderers} remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
            {!!(data.tags || []).length && (
              <>
                <p className="mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag, i) => (
                    <span className="rounded-full text-white py-1 px-3" style={{ backgroundColor: "var(--menuHover)" }} key={`tag${i}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </>
            )}
          </Page.Section>
        </Page.Article>
      </Page.Body>
    );
  } catch (e) {
    return (
      <Page.Body>
        <Page.Article>
          <Page.Section>
            <PageMessage>
              {e instanceof Error ? e.message : typeof e === "string" ? e : typeof e === "object" ? <pre>{JSON.stringify(e)}</pre> : "Unkown Error"}
            </PageMessage>
          </Page.Section>
        </Page.Article>
      </Page.Body>
    );
  }
};

export default Blog;

Blog.getLayout = function (page, { data }) {
  const meta = {
    title: data?.title,
    description: data?.description,
    image: data?.image || "",
    articleMeta: {
      published_date: data?.dateISO,
      ...(data?.updatedISO && { modified_date: data?.updatedISO })
    }
  };
  
  return (
    <MainLayout title={data?.title} meta={meta} menu backTo="/blog">
      {page}
    </MainLayout>
  );
};

export async function getStaticProps(context: any) {
  const {
    params: { slug }
  } = context;

  const dirPath = getContentDir();
  const postsPath = `${dirPath}/posts.json`;
  const filePath = `${dirPath}/${slug}.md`;

  let meta: any;
  let file: any;
  if (existsSync(postsPath)) {
    const data = readFileSync(postsPath, "utf8");
    const posts: PostData[] = JSON.parse(data);
    meta = posts.find(p => p.slug == slug);
  } else {
    file = storage.file(`${firebaseConfig.blogStorage}/${slug}.md`);
    [meta] = await file.getMetadata();
  }

  let result = { data: "" };
  let write = false;
  if (existsSync(filePath)) {
    const stat = statSync(filePath);
    const tdiff = (new Date(meta.timeCreated).getTime() - stat.ctime.getTime()) / 1000;
    if (tdiff > 0) {
      write = true;
      rmSync(filePath);
    } else {
      result.data = readFileSync(filePath, "utf8");
    }
  } else write = true;

  if (write) {
    if (!file) file = storage.file(`${firebaseConfig.blogStorage}/${slug}.md`);
    await file.download({ destination: filePath });
    result.data = readFileSync(filePath, "utf8");
  }

  const { content, data } = matter(result.data);
  console.log("Revalidating...", slug);
  if (data.date) data.dateISO = new Date(data.date).toISOString();
  if (data.updated) data.updatedISO = new Date(data.updated).toISOString();
  for (let key in data) {
    if (data[key] instanceof Date) {
      data[key] = data[key].toLocaleDateString("en-us", { weekday: "long", year: "numeric", month: "short", day: "numeric" });
    }
  }

  return {
    props: {
      content,
      data
    }
  };
}

export async function getStaticPaths() {
  const dirPath = getContentDir();
  const postsPath = `${dirPath}/posts.json`;

  let posts: PostData[];
  if (existsSync(postsPath)) {
    const data = readFileSync(postsPath, "utf8");
    posts = JSON.parse(data);
  } else {
    const result = await fetchPosts(true);
    posts = result?.posts || [];
  }

  return {
    paths: posts.map(p => ({
      params: { slug: p.slug }
    })),
    fallback: true
  };
}

const flattenChildren: any = (children: any[]) => {
  return (children || [])
    .map(c => {
      if (typeof c == "object") return flattenChildren(c.props.children);
      return c;
    })
    .join(" ");
};
