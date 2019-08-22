import {createSearchTemplate} from '../src/components/search.js';
import {getUserStatus} from '../src/components/user-profile-data.js';
import {createUserProfileTemplate} from '../src/components/user-profile.js';
import {createSiteMenuTemplate} from '../src/components/site-menu.js';
import {createSortTemplate} from '../src/components/sort.js';
import {createFilmsWrapperTemplate} from '../src/components/films-wrapper.js';
import {createFilmsListTemplate} from '../src/components/films-list.js';
import {createFilmsListExtraTemplate} from '../src/components/films-list-extra.js';

import {getFilm} from '../src/components/card-data.js';
import {createCardTemplate} from '../src/components/card.js';

import {createPopupTemplates} from '../src/components/popup.js';

import {createTitleTemplates} from '../src/components/title.js';
import {createShowMoreBtnTemplate} from '../src/components/show-more-btn.js';

const renderComponent = (container, component, position) => {
  document.querySelector(container).insertAdjacentHTML(position, component);
};

const COUNT_FILMS = 8;
const FILTERS = [`All films`, `Watchlist`, `History`, `Favorite`, `Stats`];
const allFilms = [];
let watchedFilms;
let topRated;
let mostCommented;

for (let i = 0; i < COUNT_FILMS; i++) {
  allFilms.push(getFilm());
}

topRated = allFilms.sort((a, b) => b.rating - a.rating).slice(0, 2);
mostCommented = allFilms.sort((a, b) => b.commentsCount - a.commentsCount).slice(0, 2);
watchedFilms = allFilms.filter(({hasWatched}) => hasWatched).length;

const FILTER_DATA = FILTERS.map((filterName) => {
  let filterCount;
  switch (filterName) {
    case `All films` :
      filterCount = allFilms.length;
      break;
    case `Watchlist` :
      filterCount = allFilms.filter(({hasWatchlist}) => hasWatchlist).length;
      break;
    case `History` :
      filterCount = allFilms.filter(({hasWatched}) => hasWatched).length;
      break;
    case `Favorite` :
      filterCount = allFilms.filter(({isFavorite}) => isFavorite).length;
      break;
    case `Stats` :
      filterCount = 0;
      break;
    default:
      return 0;
  }
  return {
    title: filterName,
    count: filterCount
  };
});

const test = new Map([
  [`all`, false],
  [`watch`, true],
  [`history`, true],
  [`favorites`, true],
  [`stats`, false]
]);

renderComponent(`.header`, createSearchTemplate(), `beforeend`);
renderComponent(`.header`, createUserProfileTemplate(getUserStatus(watchedFilms)), `beforeend`);
renderComponent(`.main`, createSiteMenuTemplate(), `beforeend`);
renderComponent(`.main`, createSortTemplate(), `beforeend`);
renderComponent(`.main`, createFilmsWrapperTemplate(), `beforeend`);
renderComponent(`.films`, createFilmsListTemplate(), `beforeend`);
renderComponent(`.films-list`, createTitleTemplates(`All movies. Upcoming`, true), `afterbegin`);
renderComponent(`.films-list`, createShowMoreBtnTemplate(), `beforeend`);

renderComponent(`.films-list .films-list__container`, allFilms.map(createCardTemplate).join(``), `beforeend`);

renderComponent(`.films`, createFilmsListExtraTemplate(topRated, `Top rated`), `beforeend`);
renderComponent(`.films`, createFilmsListExtraTemplate(mostCommented, `Most commented`), `beforeend`);
renderComponent(`body`, createPopupTemplates(), `beforeend`);

document.querySelector(`.film-details`).style.display = `none`;
