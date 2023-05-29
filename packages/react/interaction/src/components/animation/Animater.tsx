import React, { Children, cloneElement, DetailedReactHTMLElement, useContext, useEffect } from 'react';
import { Animate, AnimateInterface } from '@milibrary/core';

export interface AnimaterInterface extends React.PropsWithChildren {
  animation?: AnimateInterface;
  delay?: number;
  fill?: FillMode;
  keyframes?: Keyframe[];
  direction?: PlaybackDirection;
  easing?: string;
  duration?: number;
  isPlay: boolean;
}

export const Animater: React.FC<AnimaterInterface> = (props) => {
  const { animation, delay, fill, duration, easing, direction, keyframes, children, isPlay } = props;
  const ref = React.useRef<HTMLElement>();
  const anim = React.useRef<AnimateInterface>();

  useEffect(() => {
    if (animation) {
      anim.current = animation.addElement(ref.current).setDelay(delay).setFill(fill)
    } else {
      anim.current = Animate({
        delay, fill, duration, easing, direction, keyframes
      })
    }
    anim.current.play();
  }, [isPlay]);

  return (
    <>
      {Children.map(children, (child) => {
        if (!React.isValidElement(child)) {
          return null;
        }
        return cloneElement(child, {
          ...child.props,
          ref,
        })
      }
      )}
    </>
  );
}