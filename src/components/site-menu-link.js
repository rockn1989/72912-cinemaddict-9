export const createSiteMenuLink = ({title, anchor, count}) =>
  `<a href="#${anchor}" class="main-navigation__item">${title} ${count.toString().length > 0 ? `<span class="main-navigation__item-count">${count}</span>` : ``}</a>`;
