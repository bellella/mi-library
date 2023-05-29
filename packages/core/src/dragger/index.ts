export function setDragger(box: HTMLElement, container: HTMLElement): Function | null {
  if (!box || !container) {
    return null;
  }
  let isDragging = false;
  let rafId: number;
  let position = {
    original: {
      x: 0,
      y: 0
    },
    current: {
      x: 0,
      y: 0
    },
    offset: {
      x: 0,
      y: 0
    },
    start: {
      x: 0,
      y: 0
    },
    max: {
      x: 0,
      y: 0
    },
    velocity: {
      x: 0,
      y: 0
    }
  }
  const down = (event: TouchEvent | MouseEvent) => {
    isDragging = true;
    isRunning = true;
    const eventData = event instanceof TouchEvent ? event.touches[0] : event;
    const { pageX, pageY, clientX, clientY } = eventData;
    position.original.x = clientX;
    position.start.x = Number(position.current.x);
    position.max.x = -(container.scrollWidth - box.offsetWidth);
    position.offset.x = 0;
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animate);
  }

  const move = (event: TouchEvent | MouseEvent) => {
    if (!isDragging) {
      return;
    }
    event.preventDefault();
    const eventData = event instanceof TouchEvent ? event.touches[0] : event;
    const { pageX, pageY, clientX, clientY } = eventData;
    position.offset.x = clientX - position.original.x;
  }
  const up = () => {
    isDragging = false;
  }
  let isRunning = false;

  const isMoving = () => {
    return (
      isDragging ||
      Math.abs(position.velocity.x) >= 0.01
    );
  }
  const animate = () => {
    if (!isRunning) {
      return false;
    }
    dragVelocity();
    bounceVelocity();
    position.current.x += position.velocity.x * 0.3;
    const over = Math.abs(position.current.x) > Math.abs(position.max.x) || position.current.x > 0;
    if (isDragging && over && position.offset.x < 0) {
      //position.current.x = Math.max(0, position.current.x)
      if (position.current.x > 0) {
      }
    }
    if (isMoving()) {
      box.style.transform = `translate(${position.current.x}px, 0)`;
      rafId = requestAnimationFrame(() => animate());
    } else {
      cancelAnimationFrame(rafId);
      isRunning = false;
    }

  }

  const dragVelocity = () => {
    const over = Math.abs(position.current.x) > Math.abs(position.max.x) || position.current.x > 0;
    let originalAddingPosition = position.start.x + position.offset.x;
    if (isDragging && over) {
    }
    let addingVelocity = (originalAddingPosition - position.current.x);
    position.velocity.x += addingVelocity - position.velocity.x;
  }

  const bounceVelocity = () => {
    if (isDragging) {
      return false;
    }
    const over = Math.abs(position.current.x) > Math.abs(position.max.x) || position.current.x > 0;
    const overFrom = position.current.x > 0;
    const edge = overFrom ? 0 : position.max.x;
    const distance = edge - position.current.x;
    if (over) {
      position.velocity.x += (distance * 0.5) - position.velocity.x;
    }
  }

  if (container) {
    container.addEventListener('mousedown', down);
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);

    container.addEventListener('touchstart', down, { passive: false });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', up);

  }
  return () => {
    container.removeEventListener('mousedown', down);
    window.removeEventListener('mousemove', move);
    window.removeEventListener('mouseup', up);

    container.removeEventListener('touchstart', down);
    window.removeEventListener('touchmove', move);
    window.removeEventListener('touchend', up);
  }
}