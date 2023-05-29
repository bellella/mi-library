import React, { Children, cloneElement, useEffect } from 'react';


export const AnimationContext = React.createContext({ isIntersecting: false });

interface AnimationObserverInterface extends React.PropsWithChildren {
  isOnce?: boolean;
  threshold?: number[];
}

export const AnimationObserver: React.FC<AnimationObserverInterface> = ({ isOnce = false, children, threshold = [0.5] }) => {
  const ref = React.useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);

  useEffect(() => {
    const osv = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsIntersecting(true);
        if (isOnce) {
          osv.disconnect();
        }
      } else {
        setIsIntersecting(false);
      }
    }, { threshold });
    if (ref.current) {
      osv.observe(ref.current);
    }
    return () => osv.disconnect();
  }, [ref.current]);

  return (
    <AnimationContext.Provider value={{ isIntersecting }}>
      {Children.map(children, (child) =>
        cloneElement<any>(child as any, {
          ref
        })
      )}
    </AnimationContext.Provider>
  );
}