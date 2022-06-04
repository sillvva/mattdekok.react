import React from "react";
import Link from "next/link";
import styles from "./HexMenu.module.scss";
import { useRouter } from "next/router";

export type Item = {
  link: string;
  label: string;
  active?: boolean;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
};
type HexMenuProps = {
  items: (Item | null)[];
  maxLength: number;
  classes: string[];
  rotated: boolean;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
  itemClasses: string[];
};

const HexMenu = (props: HexMenuProps) => {
  const router = useRouter();

  const menuRows: Item[][] = [[]];
  props.items.forEach((item, i) => {
    const rowIndex = menuRows.length - 1;
    if (item)
      menuRows[rowIndex].push({
        ...item,
        ...(item.link === router.pathname && { active: true })
      });
    else menuRows[rowIndex].push({ link: "", label: "" });
    const rotDiff = !props.rotated && menuRows.length % 2 === 0 ? 1 : 0;
    if (props.maxLength >= 0 && menuRows[rowIndex].length === props.maxLength - rotDiff && props.items.length - 1 > i) {
      menuRows.push([]);
    }
  });

  return (
    <div className={[styles.HexWrapper, props.rotated ? styles.Rotated : "", ...props.classes].join(" ").trim()}>
      {menuRows.map((row, r) => {
        return (
          <div className={[styles.HexRow, r % 2 === 1 && !props.rotated ? styles.Shift : ""].join(" ").trim()} key={`hex-row${r}`}>
            {row.map((item, i) => {
              return (
                <HexMenuItem
                  key={`hex-item-${i}`}
                  link={item.link}
                  label={item.label}
                  active={!!item.active}
                  rotated={props.rotated}
                  color={item.color || props.color}
                  activeColor={item.activeColor || props.activeColor}
                  hoverColor={item.hoverColor || props.hoverColor}
                  textColor={item.textColor || props.textColor}
                  classes={props.itemClasses}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

HexMenu.defaultProps = {
  maxLength: 0,
  classes: [],
  rotated: false,
  color: "var(--menu)",
  hoverColor: "var(--menuHover)",
  activeColor: "var(--menuHover)",
  textColor: "var(--menuText)",
  itemClasses: []
};

export default HexMenu;

type HexMenuItemProps = {
  link: string;
  label: string;
  active: boolean;
  rotated: boolean;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
  classes: string[];
};

const HexMenuItem = (props: HexMenuItemProps) => {
  const menuItem = props.label ? (
    <a
      className={[styles.HexMenuItem, props.active ? styles.Active : "", props.rotated ? styles.Rotated : "", ...props.classes.map(c => styles[c] ?? c)].join(
        " "
      )}
      style={
        {
          ...(props.color && { "--item-color": props.color }),
          ...(props.hoverColor && { "--hover-color": props.hoverColor }),
          ...(props.activeColor && { "--active-color": props.activeColor }),
          ...(props.textColor && { "--text-color": props.textColor })
        } as React.CSSProperties
      }>
      <span className={styles.ItemLabel}>{props.label}</span>
      <div className={`${styles.Face} ${styles.BackFace} ${styles.Face1}`}></div>
      <div className={`${styles.Face} ${styles.BackFace} ${styles.Face2}`}></div>
      <div className={`${styles.Face} ${styles.BackFace} ${styles.Face3}`}></div>
      <div className={`${styles.Face} ${styles.Face1}`}></div>
      <div className={`${styles.Face} ${styles.Face2}`}></div>
      <div className={`${styles.Face} ${styles.Face3}`}></div>
    </a>
  ) : (
    <span className={[styles.HexMenuItem, props.rotated ? styles.Rotated : "", styles.Empty].join(" ")}></span>
  );

  if (!props.link) return menuItem;

  return <Link href={props.link}>{menuItem}</Link>;
};

HexMenuItem.defaultProps = {
  active: false,
  rotated: false,
  classes: []
};
