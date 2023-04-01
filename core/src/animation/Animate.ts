export function Animate() {
  let keyframes: Keyframe[] = [];
  let duration = 500;
  let elements: HTMLElement[] = [];
  let isReverse: boolean = false;
  let fill: FillMode;
  let delay: number;

  let animate: AnimateInterface;

  const addKeyframes = (keyframe: Keyframe[]) => {
    keyframes = keyframes.concat(keyframe);
    return animate;
  }

  const setReverse = (reverse: boolean) => {
    isReverse = reverse;
    return animate;
  }

  const setDuration = (newDuration: number) => {
    duration = newDuration;
    return animate;
  }

  const setFill = (newFill: FillMode) => {
    if (fill) {
      fill = newFill;
    }
    return animate;
  }

  const setDelay = (newDelay: number) => {
    if (newDelay !== undefined) {
      delay = newDelay;
    }
    return animate;
  }

  const play = () => {
    return new Promise((resolve) => {
      let count = elements.length;
      elements.forEach(element => {
        const ani = element.animate(keyframes, {
          duration,
          easing: "linear",
          fill: "forwards",
          ...(delay && { delay })
        });
        ani.onfinish = () => {
          count--;
          if (count === 0) {
            resolve(animate);
          }
        }
      })
    })
  }

  const addElement = (element: HTMLElement) => {
    elements.push(element);
    return animate;
  }

  return animate = {
    addKeyframes,
    addElement,
    setReverse,
    setDuration,
    setFill,
    setDelay,
    play
  };
}

export interface AnimateInterface {
  addKeyframes: (keyframe: Keyframe[]) => AnimateInterface;
  addElement: (element: HTMLElement) => AnimateInterface;
  setDelay: (delay: number) => AnimateInterface;
  setDuration: (duration: number) => AnimateInterface;
  setFill: (fill: FillMode) => AnimateInterface;
  play: () => Promise<AnimateInterface | unknown>;
  setReverse: (reverse: boolean) => AnimateInterface;
}