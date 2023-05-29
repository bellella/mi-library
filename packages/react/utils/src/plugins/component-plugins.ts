import ReactDOM from "react-dom";

export const bodyRender = (reactComponent: React.ReactElement) => {
  const modalBody = document.createElement('div');
  modalBody.setAttribute('slot', 'body');
  ReactDOM.hydrate(reactComponent, modalBody);

  return (customComponent: HTMLElement) => {
    customComponent.append(modalBody);
  }
}