import Link from "next/link";
import { useRef, useState } from "react";
import { useRipple } from "../ripple";
import buttons from "./Buttons.module.scss";
import ripple from "../ripple/Ripple.module.scss";

type AnimatedButtonProps = {
  link?: string;
  label: string;
  active?: boolean;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  textColor?: string;
  clickRipple?: boolean;
  itemClasses: string[];
};

export default function AnimatedButton(props: AnimatedButtonProps) {
  const {
    active = false,
    itemClasses = ["Button5"],
    color = "var(--link)",
    hoverColor = "var(--linkHover)",
    activeColor = "var(--linkHover)",
    textColor = "var(--linkText)",
    link = "",
    label,
    clickRipple
  } = props;
  const btnRef = useRef<HTMLAnchorElement>(null);
  const { ripples, mouseEvents, rippleClass } = useRipple({ enabled: clickRipple, active });

  const propClasses = itemClasses.map(c => buttons[c] ?? c);
  const [classes, setClasses] = useState([buttons.Button, active ? buttons.Active : "", rippleClass, ...propClasses]);
  if (!classes.find(c => /Button\d+/.test(c))) {
    setClasses([...classes, buttons.Button5]);
  }

  const style = {
    ...(color && { "--item-color": color }),
    ...(hoverColor && { "--hover-color": hoverColor }),
    ...(activeColor && { "--active-color": activeColor }),
    ...(textColor && { "--text-color": textColor }),
    ...(active && { cursor: "default" })
  } as React.CSSProperties;

  const btn = (
    <a className={classes.join(" ")} style={style} ref={btnRef} {...mouseEvents}>
      {ripples}
      {label}
    </a>
  );

  return (
    <Link href={link} scroll={false}>
      {btn}
    </Link>
  );
}
