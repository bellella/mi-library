import React, { Children, cloneElement, useContext, useEffect } from 'react';
import { AnimationContext } from './AnimationObserver';
import { AnimateInterface } from '@milibrary/core';

interface AnimationTargetInterface extends React.PropsWithChildren {
  className?: string;
  animation?: AnimateInterface;
  delay?: number;
  fill?: FillMode;
}

export const AnimationTarget: React.FC<AnimationTargetInterface> = ({ animation, className, delay, fill, children }) => {
  const { isIntersecting } = useContext(AnimationContext);
  const classNames = [`${className}-original`, className];
  const ref = React.useRef<HTMLElement>();
  const anim = React.useRef<AnimateInterface>();

  useEffect(() => {
    if (animation) {
      anim.current = animation.divide().addElement(ref.current).setDelay(delay).setFill(fill)
    }
  }, []);

  useEffect(() => {
    if (animation && anim.current) {
      if (isIntersecting) {
        anim.current.play();
      }
    }

    if (className && delay) {
      ref.current.style.animationDelay = `${delay}`;
    }
  }, [isIntersecting]);

  return (
    <>
      {Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        return cloneElement(child, {
          ...child.props,
          ref,
          ...(className && { className: [child.props?.className, ...[...(isIntersecting ? classNames : [classNames[0]])]].join(' ') })
        })
      }
      )}
    </>
  );
}