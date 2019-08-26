export const createSiteMenuLink = ({title, anchor, count}) =>
  `<a href="#${anchor}" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>`;
