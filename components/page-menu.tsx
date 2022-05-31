import { useState } from 'react';
import Link from 'next/link'
import styles from '../layouts/main/MainLayout.module.scss'
import buttons from '../styles/Buttons.module.scss';
import { useRouter } from 'next/router';

export type Item = {
  link: string;
  label: string;
  active?: boolean;
  color?: string,
  hoverColor?: string,
  activeColor?: string,
  textColor?: string,
}
type PageMenuProps = {
  items: (Item | null)[];
  maxLength?: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
  itemClasses?: string[]
}

const PageMenu = (props: PageMenuProps) => {
  const {
    maxLength = 0,
    itemClasses = [],
    color = "var(--link)",
    hoverColor = "var(--linkHover)",
    activeColor = "var(--linkHover)",
    textColor = "var(--linkText)",
    items
  } = props;
  
  const router = useRouter();

  const menuRows: (Item)[][] = [[]];
  items.forEach((item, i) => {
    const rowIndex = menuRows.length - 1;
    if (item) menuRows[rowIndex].push({
      ...item,
      ...(item.link === router.pathname && { active: true }),
    });
    if (maxLength >= 0 && menuRows[rowIndex].length === maxLength && items.length - 1 > i) {
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
                  color={item.color || color}
                  itemClasses={itemClasses}
                  active={!!item.active}
                  activeColor={item.activeColor || activeColor}
                  hoverColor={item.hoverColor || hoverColor}
                  textColor={item.textColor || textColor} />
              );
            })}
          </div>
        );
      })}
    </>
  )
}

export default PageMenu;

type PageMenuItemProps = {
  link: string;
  label: string;
  active?: boolean;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
  itemClasses: string[]
}

export const PageMenuItem = (props: PageMenuItemProps) => {
  const {
    active = false,
    itemClasses = [buttons.Button5],
    color = "var(--link)",
    hoverColor = "var(--linkHover)",
    activeColor = "var(--linkHover)",
    textColor = "var(--linkText)",
    link,
    label
  } = props;

  const [classes, setClasses] = useState([buttons.Button, active ? buttons.Active : '', ...itemClasses]);
  if (!classes.find(c => /Button\d+/.test(c))) {
    setClasses([...classes, buttons.Button5]);
  }

  const style = {
    ...(color && { '--item-color': color }),
    ...(hoverColor && { '--hover-color': hoverColor }),
    ...(activeColor && { '--active-color': activeColor }),
    ...(textColor && { '--text-color': textColor }),
  } as React.CSSProperties;

  if (!link || active) return (
    <a className={classes.join(' ')} style={style}>
      {label}
    </a>
  );

  return (
    <Link href={link}>
      <a className={classes.join(' ')} style={style}>
        {label}
      </a>
    </Link>
  )
}