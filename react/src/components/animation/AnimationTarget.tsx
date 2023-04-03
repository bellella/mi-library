import React, { Children, cloneElement, DetailedReactHTMLElement, useContext, useEffect } from 'react';
import { AnimateInterface } from '@milibrary/core'
import { AnimationContext } from './AnimationObserver';

interface AnimationTargetInterface extends React.PropsWithChildren {
  className?: string;
  animation?: AnimateInterface;
  delay?: number;
  fill?: FillMode;
}

const AnimationTarget: React.FC<AnimationTargetInterface> = ({ animation, className, delay, fill, children }) => {
  const { isIntersecting } = useContext(AnimationContext)
  const classNames = [`${className}-original`, className];
  const ref = React.useRef<HTMLElement>();
  const anim = React.useRef<AnimateInterface>();

  useEffect(() => {
    if (animation) {
      anim.current = animation.addElement(ref.current).setDelay(delay * 1000).setFill(fill)
    }
  }, []);

  useEffect(() => {
    if (isIntersecting && animation && anim.current) {
      anim.current.play();
    }
    if (className && delay) {
      ref.current.style.animationDelay = `${delay}s`;
    }
  }, [isIntersecting]);

  return (
    <>
      {Children.map(children, (child, index) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        return cloneElement(child, {
          ...child.props,
          ref,
          className: [child.props?.className, ...[...(isIntersecting ? classNames : [classNames[0]])]].join(' ')
        })
      }
      )}
    </>
  );
}

export default AnimationTarget;