export const createSiteMenuTemplate = () => `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">13</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">4</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">8</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">Stats</a>
  </nav>`;

/* export const createSiteMenuTemplate = ({ title, count }) => `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active">${title}</a>
    <a href="#watchlist" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>
    <a href="#history" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>
    <a href="#favorites" class="main-navigation__item">${title} <span class="main-navigation__item-count">${count}</span></a>
    <a href="#stats" class="main-navigation__item main-navigation__item--additional">${title}</a>
  </nav>`;
 */
