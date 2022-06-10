import { Key, useEffect } from "react";
import buttons from "./Buttons.module.scss";

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
    <div className={buttons.RipEl}>
      <span key={index} data-ripple-index={index} style={style}></span>
    </div>
  );
}
