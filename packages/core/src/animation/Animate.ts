
export function Animate(options: AnimateOptions = {}): AnimateInterface {
  let {
    keyframes = [],
    duration = 500,
    elements = [],
    delay,
    iterations,
    fill = 'forwards',
    easing = 'linear',
    direction = 'normal' } = options;

  let animate: AnimateInterface;
  let animations: Animation[];

  const setKeyframes = (newKeyframes: Keyframe[]) => {
    keyframes = newKeyframes;
    return animate;
  }

  const setDirection = (newDirection: PlaybackDirection) => {
    direction = newDirection;
    return animate;
  }

  const setDuration = (newDuration: number) => {
    duration = newDuration;
    return animate;
  }

  const setFill = (newFill: FillMode) => {
    if (newFill) {
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

  const setEasing = (newEasing: string) => {
    easing = newEasing;
    return animate;
  }

  const setIterations = (newIterations: number) => {
    iterations = newIterations;
    return animate;
  }


  const play = () => {
    return new Promise((resolve) => {
      let count = elements.length;
      if (!count) {
        throw new Error('elements are not exist');
      }
      elements.forEach(element => {
        const ani = element.animate(keyframes, {
          direction,
          duration,
          easing,
          fill,
          iterations,
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

  const addElement = (element: HTMLElement | HTMLElement[]) => {
    elements = elements.concat(element);
    return animate;
  }

  const divide = () => {
    return Animate({
      elements,
      keyframes,
      duration,
      direction,
      fill,
      easing,
      iterations
    })
  }

  return animate = {
    setKeyframes,
    addElement,
    setDirection,
    setDuration,
    setFill,
    setDelay,
    setEasing,
    setIterations,
    play,
    divide
  };
}

export interface AnimateOptions {
  keyframes?: Keyframe[];
  duration?: number;
  elements?: HTMLElement[];
  delay?: number;
  fill?: FillMode;
  easing?: string;
  direction?: PlaybackDirection;
  iterations?: number;
}

export interface AnimateInterface {
  setKeyframes: (keyframe: Keyframe[]) => AnimateInterface;
  addElement: (element: HTMLElement | HTMLElement[]) => AnimateInterface;
  setDirection: (direction: PlaybackDirection) => AnimateInterface;
  setDelay: (delay: number) => AnimateInterface;
  setDuration: (duration: number) => AnimateInterface;
  setIterations: (iterations: number) => AnimateInterface;
  setFill: (fill: FillMode) => AnimateInterface;
  setEasing: (easing: string) => AnimateInterface;
  play: () => Promise<AnimateInterface | unknown>;
  divide: () => AnimateInterface;
}