import { CustomComponent } from "../CustomComponent";
import styles from './style.module.css';

const TEMPLATE = `
<div class="mi-container mi-loading-container">
   <span class="mi-loading-loader"></span> 
</div>
`;
const ElEMENT_NAME = 'mi-loading';
export class Loading extends CustomComponent {

  private _options: LoadingOptions = {
    useDefaultStyle: true,
    useOverlay: false
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
      style: styles,
    });
    if (this.options.useOverlay) {
      this.attachOverlay(false);
    }
    const loader = this.getElement('.mi-loading-loader');
    if (loader && this.options.useDefaultStyle) {
      loader.classList.add('mi-loading-loader-default');
    }
  }

  present() {
    this.presentElement();
    this.callOnPresent();
  }

  dismiss() {
    this.removeElement();
    this.callOnDismiss();
  }

  static define() {
    if (!customElements.get(ElEMENT_NAME)) {
      customElements.define(ElEMENT_NAME, this);
    }
  }

  static create(options?: LoadingOptions): LoadingCtrl {
    let ctrl: LoadingCtrl;
    this.define();
    const component = document.createElement(ElEMENT_NAME) as Loading;
    document.body.append(component);
    Object.assign(component.options, options);
    return ctrl = {
      present() {
        component.present();
        return ctrl;
      },
      presentAsync(func) {
        component.present();
        return new Promise((resolve, reject) => {
          if (options?.duration !== undefined && !isNaN(options.duration)) {
            setTimeout(() => component.dismiss(), options.duration ?? 3000);
            resolve(null);
          }
          if (func) {
            func.then((res: any) => {
              resolve(res);
              component.dismiss();
            })
              .catch(e => {
                reject(e);
                component.dismiss();
              });
          }
          else {
            resolve(null);
          }
        });
      },
      dismiss() {
        component.dismiss();
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

export interface LoadingCtrl {
  present: () => LoadingCtrl;
  presentAsync: (func?: Promise<any>) => Promise<any>;
  dismiss: () => LoadingCtrl;
  getElement: () => Loading;
  onPresent: (callback: Function) => LoadingCtrl;
  onDismiss: (callback: Function) => LoadingCtrl;
}

export interface LoadingOptions {
  useDefaultStyle?: boolean;
  useOverlay?: boolean;
  duration?: number;
}