import {render, renderAppend} from '../src/components/utils.js';

import {createSearchTemplate} from '../src/components/search.js';
import {getUserStatus} from '../src/mocks/user-profile-data.js';
import {createUserProfileTemplate} from '../src/components/user-profile.js';
import {createSiteMenuTemplate} from '../src/components/site-menu.js';
import {createSiteMenuLink} from '../src/components/site-menu-link.js';
import {createStatsBtnTemplate} from '../src/components/stats-btn.js';

import {createSortTemplate} from '../src/components/sort.js';
import {createFilmsWrapperTemplate} from '../src/components/films-wrapper.js';
import {FilmsList} from '../src/components/films-list.js';

import {Card} from '../src/components/card.js';

import {getFilm} from '../src/mocks/card-data.js';

import {getPopupData} from '../src/mocks/popup-data.js';
import {getComment} from '../src/mocks/comment-data.js';
import {Popup} from '../src/components/popup.js';
import {CommentsList} from './components/comments-list.js';
import {Comment} from '../src/components/comment.js';
import {createNewComments} from '../src/components/comments-new.js';


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

render(`.films`, new FilmsList({title: `All movies. Upcoming`}).getElement(), `beforeend`);
render(`.films`, new FilmsList({title: `Top rated`, columns: 2}).getElement(), `beforeend`);
render(`.films`, new FilmsList({title: `Most commented`, columns: 2}).getElement(), `beforeend`);

const renderFilms = (filmMock, containerIdx) => {
  const film = new Card(filmMock);
  const popup = new Popup(getPopupData());

  const showModal = function (evt) {
    evt.preventDefault();

    const card = evt.target.parentNode;
    const cardWrapper = evt.target.parentNode.parentNode;
    const cardIdx = [...cardWrapper.querySelectorAll(`.film-card`)].indexOf(card);

    [...document.querySelectorAll(`.film-details`)][cardIdx].style.display = `block`;
    [...document.querySelectorAll(`.film-details`)][cardIdx].classList.add(`visible`);
  };

  const hiddenModal = function (evt) {
    if (evt.key === `Escape` || evt.key === `Esc` || evt.target.nodeName === `BUTTON`) {
      document.querySelector(`.film-details.visible`).style.display = `none`;
      document.querySelector(`.film-details.visible`).classList.remove(`visible`);
    }
  };

  film.getElement()
    .querySelector(`.film-card__title`)
    .addEventListener(`click`, showModal);
  film.getElement()
    .querySelector(`.film-card__poster`)
    .addEventListener(`click`, showModal);
  film.getElement()
    .querySelector(`.film-card__comments`)
    .addEventListener(`click`, showModal);

  popup.getElement()
    .querySelector(`.film-details__close-btn`)
    .addEventListener(`click`, hiddenModal);

  document.querySelector(`body`).addEventListener(`keydown`, hiddenModal);

  renderAppend(filmsContainers[containerIdx], film.getElement(), `beforeend`);
  render(`body`, popup.getElement(), `beforeend`);
};

const filmsContainers = document.querySelectorAll(`.films-list__container`);

filmsContainers.forEach((container, i) => {
  if (i === 0) {
    allFilms.slice(0, MAX_FILMS).map((film) => {
      renderFilms(film, i);
    });
  } else if (i === 1) {
    sortArray(allFilms, `rating`, 2).map((film) => {
      renderFilms(film, i);
    });
  } else if (i === 2) {
    sortArray(allFilms, `commentsCount`, 2).map((film) => {
      renderFilms(film, i);
    });
  }
});


render(`body`, new Popup(getPopupData()).getElement(), `beforeend`);
render(`.film-details__inner`, new CommentsList(allComments.length).getElement(), `beforeend`);

allComments.map((comment) => {
  render(`.film-details__comments-list`, new Comment(comment).getElement(), `beforeend`);
});

renderComponent(`.film-details__comments-wrap`, createNewComments(), `beforeend`);


const LOAD_MORE_BTN = document.querySelector(`.films-list__show-more`);

const loadingFilm = (e) => {
  e.preventDefault();
  const currentCountFilms = document.querySelectorAll(`.films-list .films-list__container>.film-card`).length;
  const remainingFilms = allFilms.slice(currentCountFilms, currentCountFilms + MAX_FILMS).length;

  if (currentCountFilms + remainingFilms >= allFilms.length) {
    allFilms.slice(currentCountFilms, currentCountFilms + remainingFilms).map((film) => {
      render(`.films-list .films-list__container`, new Card(film).getElement(), `beforeend`);
    });

    LOAD_MORE_BTN.removeEventListener(`click`, loadingFilm);
    LOAD_MORE_BTN.remove();
  } else {
    allFilms.slice(currentCountFilms, currentCountFilms + MAX_FILMS).map((film) => {
      render(`.films-list .films-list__container`, new Card(film).getElement(), `beforeend`);
    });
  }
};

LOAD_MORE_BTN.addEventListener(`click`, loadingFilm);
document.querySelector(`.footer__statistics p`).textContent = allFilms.length;
document.querySelectorAll(`.film-details`).forEach((popup) => {
  popup.style.display = `none`;
});

