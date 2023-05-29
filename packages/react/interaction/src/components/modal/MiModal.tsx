import { Modal, ModalCtrl } from '@milibrary/core';
import React, { PropsWithChildren, forwardRef } from 'react';
import ReactDOM from 'react-dom';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'mi-modal': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}

export interface MiModalInterface extends PropsWithChildren {
  onDismiss?: () => void;
  useDefaultStyle?: boolean;
  useOverlay?: boolean;
  useOverlayClickDismiss?: boolean;
}

export interface MiModalRefInterface {
  present: () => void;
  dismiss: () => void;
}

export const MiModal = forwardRef<MiModalRefInterface, MiModalInterface>(({
  onDismiss,
  useDefaultStyle,
  useOverlay,
  useOverlayClickDismiss,
  children }, ref) => {
  const modalRef = React.useRef<ModalCtrl>();
  const [render, setRender] = React.useState<boolean>();
  React.useEffect(() => {
    modalRef.current = Modal.create({
      useDefaultStyle,
      useOverlay,
      useOverlayClickDismiss
    });
    modalRef.current.onDismiss(() => onDismiss());
  }, []);

  React.useImperativeHandle(ref, () => {
    return {
      present() {
        modalRef.current.present();
        setRender(r => !r);
      },
      dismiss() {
        modalRef.current.dismiss();
        setRender(r => !r);
      },
    };
  }, [modalRef]);

  return (
    <>
      {
        modalRef.current && ReactDOM.createPortal(
          <div slot="body">
            {children}
          </div>, modalRef.current.getElement())
      }
    </>
  );
});