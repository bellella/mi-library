import { Animate } from '../../animation';
import { CustomComponent } from '../CustomComponent';
import styles from './style.module.css';

const TEMPLATE = `
<div class="mi-container mi-modal-container">
  <div class="mi-modal-body">
    <slot name="body">
    </slot>
  </div>
</div>
`;
const ElEMENT_NAME = 'mi-modal';
export class Modal extends CustomComponent {
  private backdrop: HTMLElement | null = null;
  private isOpen: boolean = false;
  private body: HTMLElement | null = null;

  private animations = {
    open: Animate().setKeyframes([{ transform: "scale(.5)" }, { transform: "scale(1)" }]).setDuration(300),
    close: Animate().setKeyframes([{ transform: "scale(.5)" }, { transform: "scale(0)" }]).setDuration(300)
  }
  private _options: ModalOptions = {
    useOverlay: true,
    useOverlayClickDismiss: true,
    useDefaultStyle: true
  };

  constructor() {
    super();
  }
  get options() {
    return this._options;
  }
  set options(newOptions) {
    this._options = newOptions;
  }

  createElement() {
    this.setShadow({
      content: TEMPLATE,
      style: styles
    });
  }

  initialize() {
    if (this.options.useOverlay) {
      this.attachOverlay(this.options.useOverlayClickDismiss);
    }
    const body = this.getElement('.mi-modal-body');
    if (body) {
      this.animations.open.addElement(body);
      this.animations.close.addElement(body);
      if (this.options.useDefaultStyle) {
        body.classList.add('mi-modal-body-default');
      }
    }
  }

  async present() {
    this.setWindowScroll(false);
    this.presentElement();
    await this.animations.open.play();
    this.isOpen = true;
    this.callOnPresent();
  }

  async dismiss() {
    if (!this.isOpen) {
      return;
    }
    await this.animations.close.play();
    this.setWindowScroll(true);
    this.dismissElement();
    this.callOnDismiss();
    this.isOpen = false;
  }

  static define() {
    if (!customElements.get(ElEMENT_NAME)) {
      customElements.define(ElEMENT_NAME, this);
    }
  }
  static create({
    useOverlay = true,
    useDefaultStyle = true,
    useOverlayClickDismiss = true
  }: ModalOptions): ModalCtrl {
    let ctrl: ModalCtrl;

    this.define();
    const component = document.createElement(ElEMENT_NAME) as Modal;
    document.body.append(component);
    component.options = Object.assign(component.options, {
      useOverlay,
      useDefaultStyle,
      useOverlayClickDismiss
    });
    component.initialize();

    return ctrl = {
      present() {
        component.present();
        return ctrl;
      },
      dismiss() {
        component.dismiss();
        return ctrl;
      },
      remove() {
        component.removeElement();
        component.callOnDismiss();
      },
      addBody(renderFunc) {
        const modalBody = document.createElement('div');
        modalBody.setAttribute('slot', 'body');
        component.append(modalBody);
        if (renderFunc instanceof Function) {
          renderFunc(modalBody);
        }
        return ctrl;
      },
      apply(plugin) {
        plugin(component);
        return ctrl;
      },
      getElement() {
        return component;
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

export interface ModalOptions {
  useOverlay?: boolean;
  useDefaultStyle?: boolean;
  useOverlayClickDismiss?: boolean;
}

export interface ModalCtrl {
  present: () => ModalCtrl;
  dismiss: () => ModalCtrl;
  addBody: (renderFunc: (body: any) => void) => ModalCtrl;
  apply: (plugin: (component: HTMLElement) => void) => ModalCtrl;
  getElement: () => Modal;
  remove: () => void;
  onPresent: (callback: Function) => ModalCtrl;
  onDismiss: (callback: Function) => ModalCtrl;
}
