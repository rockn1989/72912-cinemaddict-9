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

const renderAppend = (container, element, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(element);
      break;
    case Position.BEFOREEND:
      container.append(element);
      break;
  }
};

const unrender = (el) => {
  if (el) {
    el.remove();
  }
};


const clearContainer = (container) => {
  while (container.firstChild) {
    container.firstChild.remove();
  }
};
export {createElement, render, unrender, renderAppend, clearContainer};
