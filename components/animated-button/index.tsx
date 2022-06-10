import dynamic from "next/dynamic";
import Link from "next/link";
import { Key, MouseEventHandler, useCallback, useRef, useState } from "react";
import { wait } from "../../functions/misc";
import buttons from "./Buttons.module.scss";

const Ripple = dynamic(() => import("./ripple"));

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
  const [ripples, setRipples] = useState<Map<Key, JSX.Element>>(new Map());

  const propClasses = itemClasses.map(c => buttons[c] ?? c);
  const [classes, setClasses] = useState([buttons.Button, active ? buttons.Active : "", clickRipple ? buttons.Ripple : "", ...propClasses]);
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

  const rippleUnload = () => {
    wait(
      () => {
        setRipples(new Map());
      },
      "ripples",
      600
    );
  };

  const mouseHandler: MouseEventHandler<HTMLAnchorElement> = e => {
    if (!clickRipple) return;
    const key = Math.max(-1, ...[...ripples.keys()].map(r => parseInt(r.toString() || ""))) + 1;
    const ripple = <Ripple key={key} index={key} onUnload={rippleUnload} x={e.nativeEvent.offsetX} y={e.nativeEvent.offsetY}></Ripple>;
    setRipples(new Map(ripples).set(key, ripple));
  };

  const btn = (
    <a className={classes.join(" ")} style={style} ref={btnRef} onMouseDown={mouseHandler} onClick={e => active && e.preventDefault()}>
      {[...ripples.values()]}
      {label}
    </a>
  );

  return (
    <Link href={link} scroll={false}>
      {btn}
    </Link>
  );
}
