const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

const RenderComponent = (container, component) => {
  document.querySelector(container).prepend(component);
};

const removeRenderComponent = (el) => {
  if (el) {
    el.removeElement();
    el.remove();
  }
};

export {createElement, RenderComponent, removeRenderComponent};
