import React from 'react';
import styles from '../styles/Blog.module.scss'

interface CodePenEmbedProps {
  title: string;
  user: string;
  hash: string;
  height?: string | number;
}

const CodePenEmbed = (props: React.PropsWithChildren<CodePenEmbedProps>) => {
  return (
    <div>
      <div className={styles.CodePenWrapper}>
        <CodePen
          hash={props.hash}
          user={props.user}
          title={props.title}
          height={props.height || 500}
        >
          See the <a href={`https://codepen.io/${props.user}/pen/${props.hash}`} target="_blank" rel="noopener noreferrer">{props.title}</a> pen 
          by <a href={`https://codepen.io/${props.user}`} target="_blank" rel="noopener noreferrer">@{props.user}</a> on&nbsp;
          <a href="https://codepen.io" target="_blank" rel="noopener noreferrer">CodePen</a>.
        </CodePen>
      </div>
    </div>
  )
}

export default CodePenEmbed;

interface CodePenProps {
  title: string;
  user: string;
  hash: string;
  height: string | number;
}

const CodePen = (props: React.PropsWithChildren<CodePenProps>) => {
  return (
    <div
      className={[styles.CodePen, 'codepen'].join(' ')}
      data-height={props.height}
      data-default-tab="result"
      data-user={props.user}
      data-slug-hash={props.hash}
      data-pen-title={props.title}
    >
      {props.children}
    </div>
  )
}