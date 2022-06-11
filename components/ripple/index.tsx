import { Key, useEffect, useState, useCallback, MouseEventHandler } from "react";
import { wait } from "../../functions/misc";
import ripple from "./Ripple.module.scss";

type RippleProps = {
  onUnload: (index: Key) => void;
  index: Key;
  x: number;
  y: number;
};

export default function Ripple({ onUnload, index, x, y }: RippleProps) {
  useEffect(() => {
    onUnload(index);
  }, [onUnload, index]);

  const style = {
    "--x": `${x}px`,
    "--y": `${y}px`
  } as React.CSSProperties;

  return (
    <div className={ripple.RipEl} style={style}>
      <span></span>
    </div>
  );
}

type UseRippleProps = {
  enabled?: boolean;
  duration?: number;
  active?: boolean;
};

export const useRipple = (props?: UseRippleProps) => {
  const { enabled = true, duration = 600, active = false } = props || {};
  const [ripples, setRipples] = useState<Map<Key, JSX.Element>>(new Map());

  const rippleUnload = useCallback(() => {
    wait(
      () => {
        setRipples(new Map());
      },
      "ripples",
      duration
    );
  }, []);

  const mouseHandler: MouseEventHandler<any> = e => {
    if (!enabled || active) return;
    const key = Math.max(-1, ...[...ripples.keys()].map(r => parseInt(r.toString() || ""))) + 1;
    const ripple = <Ripple key={key} index={key} onUnload={rippleUnload} x={e.nativeEvent.offsetX} y={e.nativeEvent.offsetY}></Ripple>;
    setRipples(new Map(ripples).set(key, ripple));
  };

  const clickHandler: MouseEventHandler<any> = e => {
    if (active) e.preventDefault();
  };

  const mouseEvents = {
    onMouseDown: mouseHandler,
    onClick: clickHandler
  };

  return { ripples: [...ripples.values()], mouseEvents, rippleClass: enabled ? ripple.Ripple : "" };
};
