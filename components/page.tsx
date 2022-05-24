import Image from 'next/image';
import React from 'react';
import styles from '../layouts/main/MainLayout.module.scss'

const PageBody = (props: React.PropsWithChildren<unknown>) => {
  return (
    <main className={styles.PageBody}>
      {props.children}
    </main>
  )
}

interface PageArticleProps {
  className?: string;
}

const PageArticle = (props: React.PropsWithChildren<PageArticleProps>) => {
  return (
    <article className={[styles.PageArticle, props.className || ""].join(' ')}>
      {props.children}
    </article>
  )
}

interface PageSectionProps {
  className?: string;
  bgImage?: string;
}

const PageSection = (props: React.PropsWithChildren<PageSectionProps>) => {
  return (
    <section className={[props.className || "", 'bg-cover bg-center'].join(' ')} style={{ ...(props.bgImage && { backgroundImage: `url(${props.bgImage})` }) }}>
      {props.children}
    </section>
  )
}

const PageSectionItems = (props: React.PropsWithChildren<unknown>) => {
  return (
    <div className={styles.SectionItems}>
      {props.children}
    </div>
  )
}

type PageSectionItemProps = {
  image: string;
}

const PageSectionItem = (props: React.PropsWithChildren<PageSectionItemProps>) => {
  return (
    <div className={styles.SectionItem}>
      <div className={styles.SectionItem__Image}>
        <Image src={props.image} alt="" layout="fill" objectFit="contain" />
      </div>
      <div className={styles.SectionItem__Content}>
        {props.children}
      </div>
    </div>
  )
}

const Page = {
  Body: PageBody,
  Article: PageArticle,
  Section: PageSection,
  SectionItems: PageSectionItems,
  SectionItem: PageSectionItem
}

export default Page;
