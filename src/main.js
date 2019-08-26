import {createSearchTemplate} from '../src/components/search.js';
import {getUserStatus} from '../src/mocks/user-profile-data.js';
import {createUserProfileTemplate} from '../src/components/user-profile.js';
import {createSiteMenuTemplate} from '../src/components/site-menu.js';
import {createSiteMenuLink} from '../src/components/site-menu-link.js';
import {createStatsBtnTemplate} from '../src/components/stats-btn.js';

import {createSortTemplate} from '../src/components/sort.js';
import {createFilmsWrapperTemplate} from '../src/components/films-wrapper.js';
import {createFilmsListTemplate} from '../src/components/films-list.js';
import {createFilmsListExtraTemplate} from '../src/components/films-list-extra.js';

import {getFilm} from '../src/mocks/card-data.js';
import {createCardTemplate} from '../src/components/card.js';

import {getPopupData} from '../src/mocks/popup-data.js';
import {getComment} from '../src/mocks/comment-data.js';
import {createPopupTemplates} from '../src/components/popup.js';
import {createCommentsTemplates} from '../src/components/comments.js';
import {createCommentTemplate} from '../src/components/comment.js';
import {createNewComments} from '../src/components/comments-new.js';

import {createTitleTemplates} from '../src/components/title.js';
import {createShowMoreBtnTemplate} from '../src/components/show-more-btn.js';

const renderComponent = (container, component, position) => {
  document.querySelector(container).insertAdjacentHTML(position, component);
};

const COUNT_FILMS = 8;
const COUNT_COMMENTS = 4;
const MAX_FILMS = 5;
const FILTERS = [`All films`, `Watchlist`, `History`, `Favorite`];
const allFilms = [];
const allComments = [];
const sortArray = (array, fieldName, arrayLength) => array.sort((a, b) => b[fieldName] - a[fieldName]).slice(0, arrayLength);
const filterArray = (array, fieldName) => array.filter((el) => el[fieldName]);

for (let i = 0; i < COUNT_FILMS; i++) {
  allFilms.push(getFilm());
}

for (let i = 0; i < COUNT_COMMENTS; i++) {
  allComments.push(getComment());
}

const FILTER_DATA = FILTERS.map((filterName) => {
  let filterCount;
  switch (filterName) {
    case `All films`:
      filterCount = allFilms.length;
      break;
    case `Watchlist`:
      filterCount = filterArray(allFilms, `hasWatchlist`).length;
      break;
    case `History`:
      filterCount = filterArray(allFilms, `hasWatched`).length;
      break;
    case `Favorite`:
      filterCount = filterArray(allFilms, `isFavorite`).length;
      break;
    default:
      return 0;
  }
  return {
    title: filterName,
    anchor: filterName.split(` `)[0].toLowerCase(),
    count: filterCount
  };
});

renderComponent(`.header`, createSearchTemplate(), `beforeend`);
renderComponent(`.header`, createUserProfileTemplate(getUserStatus(filterArray(allFilms, `hasWatched`).length)), `beforeend`);
renderComponent(`.main`, createSiteMenuTemplate(), `beforeend`);
renderComponent(`.main-navigation`, FILTER_DATA.map(createSiteMenuLink).join(``), `beforeend`);
renderComponent(`.main-navigation`, createStatsBtnTemplate(), `beforeend`);
renderComponent(`.main`, createSortTemplate(), `beforeend`);
renderComponent(`.main`, createFilmsWrapperTemplate(), `beforeend`);
renderComponent(`.films`, createFilmsListTemplate(), `beforeend`);
renderComponent(`.films-list`, createTitleTemplates(`All movies. Upcoming`, true), `afterbegin`);
renderComponent(`.films-list`, createShowMoreBtnTemplate(), `beforeend`);

renderComponent(`.films-list .films-list__container`, allFilms.slice(0, MAX_FILMS).map(createCardTemplate).join(``), `beforeend`);

renderComponent(`.films`, createFilmsListExtraTemplate(sortArray(allFilms, `rating`, 2), `Top rated`), `beforeend`);
renderComponent(`.films`, createFilmsListExtraTemplate(sortArray(allFilms, `commentsCount`, 2), `Most commented`), `beforeend`);
renderComponent(`body`, createPopupTemplates(getPopupData()), `beforeend`);
renderComponent(`.film-details__inner`, createCommentsTemplates(allComments.length), `beforeend`);
renderComponent(`.film-details__comments-wrap`, createNewComments(), `beforeend`);
renderComponent(`.film-details__comments-list`, allComments.map(createCommentTemplate).join(``), `beforeend`);

const LOAD_MORE_BTN = document.querySelector(`.films-list__show-more`);

const loadingFilm = (e) => {
  e.preventDefault();
  const currentCountFilms = document.querySelectorAll(`.films-list .films-list__container>.film-card`).length;
  const remainigFilms = allFilms.slice(currentCountFilms, currentCountFilms + MAX_FILMS).length;

  if (currentCountFilms + remainigFilms >= allFilms.length) {
    renderComponent(`.films-list__container`, allFilms.slice(currentCountFilms, currentCountFilms + remainigFilms).map(createCardTemplate).join(``), `beforeend`);
    LOAD_MORE_BTN.removeEventListener(`click`, loadingFilm);
    LOAD_MORE_BTN.remove();
  } else {
    renderComponent(`.films-list__container`, allFilms.slice(currentCountFilms, currentCountFilms + MAX_FILMS).map(createCardTemplate).join(``), `beforeend`);
  }
};

LOAD_MORE_BTN.addEventListener(`click`, loadingFilm);
document.querySelector(`.footer__statistics p`).textContent = allFilms.length;
