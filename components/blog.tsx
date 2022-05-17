import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import styles from '../styles/Blog.module.scss'

export interface PostProps {
  slug: string;
  title: string;
  date: string;
  updated: string;
  description: string;
  tags: string[];
  image: string;
  link?: string;
}

export interface DirectoryProps {
  posts: PostProps[]
}

function BlogDirectory(props: PropsWithChildren<DirectoryProps>) {
  return (
    <div className={styles.BlogDirectory}>
      {props.posts.map((post, p) => <BlogPost key={p} post={post} />)}
    </div>
  )
}

export default BlogDirectory;

function BlogPost({ post }: PropsWithChildren<{ post: PostProps }>) {
  return (
    <Link href={post.link ? post.link : `/blog/${post.slug}`}>
      <a className={styles.BlogPost} target={post.link ? '_blank' : ''} rel={post.link ? 'noreferrer noopener' : ''}>
        <div style={{ backgroundColor: 'var(--article)' }} className={styles.BlogPost__Container}>
          <div className={styles.BlogPost__Image}>
            <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" objectPosition="center" />
          </div>
          <div className="p-3"> 
            <h1 className="text-lg font-semibold">{post.title}</h1>
            <p className="text-gray-500">{new Date(post.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
            <p style={{ color: 'var(--text)' }}>{post.description}</p>
          </div>
        </div>
      </a>
    </Link>
  );
}