const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.insertAdjacentHTML(`beforeend`, template);
  return newElement.firstChild;
};

const render = (container, element, place) => {
  const containerHTML = document.querySelector(container);
  switch (place) {
    case Position.AFTERBEGIN:
      containerHTML.prepend(element);
      break;
    case Position.BEFOREEND:
      containerHTML.append(element);
      break;
  }
};

const unrender = (el) => {
  if (el) {
    el.removeElement();
    el.remove();
  }
};

export {createElement, render, unrender};
