import styles from './style.module.css';

export class CustomComponent extends HTMLElement {
  private container: HTMLElement | null = null;
  private onDismissListners: Function[] = [];
  private onPresentListners: Function[] = [];

  constructor() {
    super();
  }
  dismiss() { }
  createElement() { }

  connectedCallback() {
    this.createElement();
  }

  setShadow({ content, style, callback }: {
    content: string;
    style?: string;
    callback?: (shadow: ShadowRoot, container: HTMLElement | null) => void;
  }) {
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = content;
    const styleElement = document.createElement('style');
    styleElement.textContent = styles;
    this.container = shadow.querySelector('.mi-container');
    if (style) {
      styleElement.textContent += style;
    }
    shadow.appendChild(styleElement);
    if (callback) {
      callback(shadow, this.container);
    }
  }
  presentElement() {
    setTimeout(() => {
      if (this.container) {
        this.container.classList.add('present');
      }
    }, 0);
  }
  dismissElement() {
    if (this.container) {
      this.container.classList.remove('present');
    }
  }

  removeElement() {
    if (this.parentNode?.contains(this)) {
      this.parentNode.removeChild(this);
    }
  }

  setScrollEvent(rootElement: HTMLElement, active: boolean) {
    if (active) {
      rootElement.style.overflow = 'unset';
    }
    else {
      rootElement.style.overflow = 'hidden';
    }
  }

  setWindowScroll(active: boolean) {
    if (active) {
      document.body.style.overflow = 'unset';
    }
    else {
      document.body.style.overflow = 'hidden';
    }
  }

  attachOverlay(useOverlayClickDismiss = true): HTMLDivElement | undefined {
    const overlay = document.createElement('div');
    overlay.classList.add('mi-overlay');
    if (useOverlayClickDismiss) {
      overlay.addEventListener('click', () => {
        this.dismiss();
      });
    }
    return this.container?.appendChild(overlay);
  }

  onPresent(callback: Function) {
    this.onPresentListners.push(callback);
  }

  callOnPresent() {
    this.onPresentListners.forEach(f => f());
  }

  onDismiss(callback: Function) {
    this.onDismissListners.push(callback);
  }

  callOnDismiss() {
    this.onDismissListners.forEach(f => f());
  }

  getElement(querySelector: string): HTMLElement | null {
    return this.shadowRoot?.querySelector(querySelector) as HTMLElement;
  }

}