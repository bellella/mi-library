import { Animate } from '../../animation';
import { CustomComponent } from '../CustomComponent';
import styles from './style.module.css';
const TEMPLATE = (message: string) => `
  <div class="mi-container mi-toast-container">
    <p class="mi-toast-text">${message}</p>
  </div>
`;

const ElEMENT_NAME = 'mi-toast';

export class Toast extends CustomComponent {
  private _options: ToastOptions = {
    message: '',
    useDefaultStyle: true
  };

  private animations = {
    open: Animate().setKeyframes([{ transform: "translateY(calc(100% + 1rem)" }, { transform: "translateY(0)" }]).setDuration(300),
    close: Animate().setKeyframes([{ transform: "translateY(0)" }, { transform: "translateY(calc(100% + 1rem)" }]).setDuration(300),
  }

  get options() {
    return this._options;
  }

  set options(newOptions) {
    this._options = newOptions;
  }

  constructor() {
    super();
  }

  createElement() {
    this.setShadow({
      content: TEMPLATE(this.options.message),
      style: styles
    });
    const container = this.shadowRoot?.querySelector('.mi-container') as HTMLElement;
    if (container) {
      this.animations.open.addElement(container);
      this.animations.close.addElement(container);
      if (this.options.useDefaultStyle) {
        container.classList.add('mi-toast-container-default');
      }
    }
  }

  async open() {
    this.presentElement();
    await this.animations.open.play();
    this.callOnPresent();
  }

  async dismiss() {
    await this.animations.close.play();
    this.dismissElement();
    this.removeElement();
    this.callOnDismiss();
    return true;
  }

  static define() {
    if (!customElements.get(ElEMENT_NAME)) {
      customElements.define(ElEMENT_NAME, this);
    }
  }

  static create(options?: ToastCreateOptions): ToastCtrl {
    let ctrl: ToastCtrl;
    this.define();
    const component = document.createElement(ElEMENT_NAME) as Toast;
    Object.assign(component.options, options);
    document.body.append(component);
    return ctrl = {
      present() {
        component.open();
        setTimeout(() => component.dismiss(), options?.duration ?? 3000);
        return ctrl;
      },
      dismiss() {
        component.dismiss();
        return ctrl;
      },
      onDismiss(callback) {
        component.onDismiss(callback);
        return ctrl;
      },
      onPresent(callback) {
        component.onPresent(callback);
        return ctrl;
      }
    };
  }

}

interface ToastCtrl {
  present: () => ToastCtrl;
  dismiss: () => ToastCtrl;
  onPresent: (callback: Function) => ToastCtrl;
  onDismiss: (callback: Function) => ToastCtrl;
}

export interface ToastOptions {
  message: string;
  useDefaultStyle?: boolean;
}

export interface ToastCreateOptions extends ToastOptions {
  duration?: number;
}