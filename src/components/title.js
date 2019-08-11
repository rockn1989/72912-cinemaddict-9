export const createTitleTemplates = (value, isHidden = false) => `<h2 class="films-list__title ${isHidden ? `visually-hidden` : ``}">${value}</h2>`;
