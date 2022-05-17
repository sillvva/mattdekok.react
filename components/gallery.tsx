import Image from "next/image";
import React, { PropsWithChildren } from "react";
import styles from '../styles/Gallery.module.scss'

interface GalleryItemProps {
  link: string | null | undefined;
  image: string | null;
  title: string;
  subtitle: string;
  description: string | null;
}

function GalleryItem(props: PropsWithChildren<GalleryItemProps>) {
  return (
    <GalleryItemWrapper link={props.link || ""}>
      {props.image && <Image src={`/images/preview-${props.image}.jpg`} alt={props.title} width={400} height={400} />}
      <div className={styles.Cover}>
        <h3>{props.title}</h3>
        {props.subtitle && <h4>{props.subtitle}</h4>}
        {props.description && <div>{props.description}</div>}
      </div>
    </GalleryItemWrapper>
  );
}

export default GalleryItem;

export interface GalleryItemWrapperProps {
  link: string;
}

function GalleryItemWrapper(props: PropsWithChildren<GalleryItemWrapperProps>) {
  if (props.link) {
    return (
      <a href={props.link} target="_blank" rel="noopener noreferrer" className={styles.LinkedGalleryItem}>
        {props.children}
      </a>
    );
  }

  return (
    <div className={styles.GalleryItem}>
      {props.children}
    </div>
  );
}