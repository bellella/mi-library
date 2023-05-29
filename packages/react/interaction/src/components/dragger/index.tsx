import React from "react";
import { setDragger } from '@milibrary/core';
export const DraggerContext = React.createContext({ setContainer: null, container: null });

export type DraggerElement = (
  props: {
    content: React.MutableRefObject<HTMLElement>,
    box: React.MutableRefObject<HTMLElement>
  }
) => JSX.Element;


export const Dragger: React.FC<{ children: DraggerElement }> = ({ children: Ele }) => {
  const boxRef = React.useRef<HTMLElement>(null);
  const containerRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    const box = boxRef.current;
    const container = containerRef.current;
    let draggerDestroy;
    if (box && container) {
      draggerDestroy = setDragger(box, container);
    }
    return () => {
      draggerDestroy?.();
    };
  }, [containerRef.current, boxRef.current]);


  return (
    <Ele content={containerRef} box={boxRef} />
  );
}