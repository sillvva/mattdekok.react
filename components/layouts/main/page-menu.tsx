import styles from "../../../layouts/main/MainLayout.module.scss";
import { useRouter } from "next/router";
import AnimatedButton from "../../animated-button";
import { useMemo } from "react";

export type Item = {
  link: string;
  label: string;
  active?: boolean;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
};
type PageMenuProps = {
  items: (Item | null)[];
  maxLength?: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
  itemClasses?: string[];
};

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

  const { pathname } = useRouter();

  const menuRows = useMemo(() => {
    const out: Item[][] = [[]];
    items.forEach((item, i) => {
      const rowIndex = out.length - 1;
      if (item)
        out[rowIndex].push({
          ...item,
          ...(item.link === pathname && { active: true })
        });
      if (maxLength >= 0 && out[rowIndex].length === maxLength && items.length - 1 > i) {
        out.push([]);
      }
    });
    return out;
  }, [items, maxLength, pathname]);

  return (
    <>
      {useMemo(
        () =>
          menuRows.map((row, r) => {
            return (
              <div className={styles.PageMenu} key={`menu-row${r}`}>
                {row.map((item, i) => {
                  return (
                    <AnimatedButton
                      key={`pmi${i}`}
                      link={item.link}
                      label={item.label}
                      color={item.color || color}
                      itemClasses={itemClasses}
                      active={!!item.active}
                      activeColor={item.activeColor || activeColor}
                      hoverColor={item.hoverColor || hoverColor}
                      textColor={item.textColor || textColor}
                      clickRipple
                    />
                  );
                })}
              </div>
            );
          }),
        [menuRows, color, hoverColor, activeColor, textColor, itemClasses]
      )}
    </>
  );
};

export default PageMenu;
