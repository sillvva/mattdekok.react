import dynamic from "next/dynamic";
import Link from "next/link";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
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
  const [ripples, setRipples] = useState<JSX.Element[]>([]);

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

  const rippleUnload = useCallback(() => {
    wait(
      () => {
        setRipples([]);
      },
      "ripples",
      600
    );
  }, []);

  const mouseHandler: MouseEventHandler<HTMLAnchorElement> = e => {
    if (!clickRipple || active) return;
    const key = Math.max(-1, ...ripples.map(r => parseInt(r.key?.toString() || ""))) + 1;
    const ripple = <Ripple key={key} index={key} onUnload={rippleUnload} x={e.nativeEvent.offsetX} y={e.nativeEvent.offsetY}></Ripple>;
    setRipples([...ripples, ripple]);
  };

  const btn = (
    <a className={classes.join(" ")} style={style} ref={btnRef} onMouseDown={mouseHandler} onClick={e => active && e.preventDefault()}>
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
