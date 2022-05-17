import React, { useState } from 'react';
import Link from 'next/link'
import styles from '../styles/MainLayout.module.scss'
import { useRouter } from 'next/router';

export interface Item {
  link: string;
  label: string;
  active?: boolean;
  color?: string,
  hoverColor?: string,
  activeColor?: string,
  textColor?: string,
}
interface PageMenuProps {
  items: (Item | null)[];
  maxLength: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
  itemClasses: string[]
}

const PageMenu = (props: React.PropsWithRef<PageMenuProps>) => {
  const router = useRouter();

  const menuRows: (Item)[][] = [[]];
  props.items.forEach((item, i) => {
    const rowIndex = menuRows.length - 1;
    if (item) menuRows[rowIndex].push({
      ...item,
      ...(item.link === router.pathname && { active: true }),
    });
    if (props.maxLength >= 0 && menuRows[rowIndex].length === props.maxLength && props.items.length - 1 > i) {
      menuRows.push([]);
    }
  });

  return (
    <>
      {menuRows.map((row, r) => {
        return (
          <div className={styles.PageMenu} key={`menu-row${r}`}>
            {row.map((item, i) => {
              return (
                <PageMenuItem key={`pmi${i}`}
                  link={item.link}
                  label={item.label}
                  color={item.color || props.color}
                  classes={props.itemClasses}
                  active={item.active}
                  activeColor={item.activeColor || props.activeColor}
                  hoverColor={item.hoverColor || props.hoverColor}
                  textColor={item.textColor || props.textColor} />
              );
            })}
          </div>
        );
      })}
    </>
  )
}

PageMenu.defaultProps = {
  maxLength: 0,
  itemClasses: [],
  color: "var(--menuColor1)",
  hoverColor: "var(--menuColor2)",
  activeColor: "var(--menuColor2)",
  textColor: "var(--menuText)",
};

export default PageMenu;

interface PageMenuItemProps {
  link: string;
  label: string;
  active: boolean;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
  classes: string[]
}

export const PageMenuItem = (props: React.PropsWithRef<PageMenuItemProps>) => {
  const [classes, setClasses] = useState([styles.Button, props.active ? styles.Active : '', ...props.classes]);
  if (!classes.find(c => /Button\d+/.test(c))) {
    setClasses([...classes, styles.Button5]);
  }

  const style = {
    ...(props.color && { '--item-color': props.color }),
    ...(props.hoverColor && { '--hover-color': props.hoverColor }),
    ...(props.activeColor && { '--active-color': props.activeColor }),
    ...(props.textColor && { '--text-color': props.textColor }),
  } as React.CSSProperties;

  if (!props.link || props.active) return (
    <a className={classes.join(' ')} style={style}>
      <span className={styles.ItemLabel}>{props.label}</span>
    </a>
  );

  return (
    <Link href={props.link}>
      <a className={classes.join(' ')} style={style}>
        <span className={styles.ItemLabel}>{props.label}</span>
      </a>
    </Link>
  )
}

PageMenuItem.defaultProps = {
  active: false,
  classes: [styles.Button5],
  color: "var(--menuColor1)",
  hoverColor: "var(--menuColor2)",
  activeColor: "var(--menuColor2)",
  textColor: "var(--menuText)",
};
