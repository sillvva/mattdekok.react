import Link from "next/link";
import { useState } from "react";
import buttons from "./Buttons.module.scss";

type AnimatedButtonProps = {
  link: string;
  label: string;
  active?: boolean;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
  itemClasses: string[];
};

export default function AnimatedButton(props: AnimatedButtonProps) {
  const {
    active = false,
    itemClasses = ['Button5'],
    color = "var(--link)",
    hoverColor = "var(--linkHover)",
    activeColor = "var(--linkHover)",
    textColor = "var(--linkText)",
    link,
    label
  } = props;

  const propClasses = itemClasses.map(c => buttons[c] ?? c);
  const [classes, setClasses] = useState([buttons.Button, active ? buttons.Active : "", ...propClasses]);
  if (!classes.find(c => /Button\d+/.test(c))) {
    setClasses([...classes, buttons.Button5]);
  }

  const style = {
    ...(color && { "--item-color": color }),
    ...(hoverColor && { "--hover-color": hoverColor }),
    ...(activeColor && { "--active-color": activeColor }),
    ...(textColor && { "--text-color": textColor })
  } as React.CSSProperties;

  if (!link || active)
    return (
      <a className={classes.join(" ")} style={style}>
        {label}
      </a>
    );

  return (
    <Link href={link}>
      <a className={classes.join(" ")} style={style}>
        {label}
      </a>
    </Link>
  );
};
