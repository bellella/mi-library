import React, { Children, cloneElement, DOMElement, ReactNode, useEffect } from 'react';


export const AnimationContext = React.createContext({ isIntersecting: false });

const AnimationObserver: React.FC<React.PropsWithChildren> = ({ children }) => {
  const ref = React.useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = React.useState<boolean>(false);
  useEffect(() => {
    const osv = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsIntersecting(true);
      } else {
        setIsIntersecting(false);
      }
    }, { threshold: [0.5] });
    osv.observe(ref.current);
    return () => osv.disconnect();
  }, [])
  return (
    <AnimationContext.Provider value={{ isIntersecting }}>
      {Children.map(children, (child, index) =>
        cloneElement<any>(child as any, {
          ref
        })
      )}
    </AnimationContext.Provider>
  );
}

export default AnimationObserver;