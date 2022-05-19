import Image from "next/image";
import Link from "next/link";
import React, { PropsWithChildren, useState } from "react";
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
  const [ active, setActive ] = useState(false);

  return (
    <Link href={post.link ? post.link : `/blog/${post.slug}`}>
      <a className={[styles.BlogPost, !post.slug && !post.link ? 'loading' : null].join(' ')} target={post.link ? '_blank' : ''} rel={post.link ? 'noreferrer noopener' : ''} onClick={() => { setActive(true) }}>
        <div className={[styles.BlogPost__Container, ...(active && !post.link ? [styles.Focus] : [])].join(' ')}>
          <div className={styles.BlogPost__Image}>
            {post.image ? <Image src={post.image} alt={post.title} layout="fill" objectFit="cover" objectPosition="center" /> : ''}
          </div>
          {post.slug || post.link ?<div className="p-3"> 
            <h1 className="text-lg font-semibold">{post.title}</h1>
            <p className="text-gray-500">{new Date(post.date).toLocaleDateString('en-us', { weekday:"long", year:"numeric", month:"short", day:"numeric"})}</p>
            <p style={{ color: 'var(--text)' }}>{post.description}</p>
          </div> : ""}
        </div>
      </a>
    </Link>
  );
}