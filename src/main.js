import {render, renderAppend} from '../src/components/utils.js';
import {PageController} from '../src/components/pagecontroller.js';

import {Sort} from '../src/components/sort.js';
import {FilmsSection} from '../src/components/films-wrapper.js';
import {FilmsList} from '../src/components/films-list.js';

import {Card} from '../src/components/card.js';
import {getFilm} from '../src/mocks/card-data.js';
import {getPopupData} from '../src/mocks/popup-data.js';
import {getComment} from '../src/mocks/comment-data.js';
import {Popup} from '../src/components/popup.js';
import {CommentsList} from './components/comments-list.js';
import {Comment} from '../src/components/comment.js';
import {CommentsNew} from '../src/components/comments-new.js';


const COUNT_FILMS = 8;
const COUNT_COMMENTS = 4;
const MAX_FILMS = 5;
const allFilms = [];
const allComments = [];
const sortArray = (array, fieldName, arrayLength) => array.sort((a, b) => b[fieldName] - a[fieldName]).slice(0, arrayLength);

for (let i = 0; i < COUNT_FILMS; i++) {
  allFilms.push(getFilm());
}

for (let i = 0; i < COUNT_COMMENTS; i++) {
  allComments.push(getComment());
}

const controller = new PageController(document.querySelector(`.main`), { films: allFilms, comments: allComments });
controller.init();


render(`.main`, new Sort().getElement(), `beforeend`);

render(`.main`, new FilmsSection().getElement(), `beforeend`);

render(`.films`, new FilmsList({title: `All movies. Upcoming`, isHidden: true}).getElement(), `beforeend`);
render(`.films`, new FilmsList({title: `Top rated`, columns: 2}).getElement(), `beforeend`);
render(`.films`, new FilmsList({title: `Most commented`, columns: 2}).getElement(), `beforeend`);


const renderFilms = (filmMock, containerIdx) => {
  const film = new Card(filmMock);
  const popup = new Popup(getPopupData());

  const showModal = function (evt) {
    evt.preventDefault();

    popup.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, hiddenModal);

    popup.getElement().style.display = `block`;
    popup.getElement().classList.add(`visible`);
    document.querySelector(`body`).addEventListener(`keydown`, hiddenModal);
  };

  const hiddenModal = function (evt) {
    if (evt.key === `Escape` || evt.key === `Esc` || evt.target.className === `film-details__close-btn`) {
      popup.getElement().style.display = `none`;
      popup.getElement().classList.remove(`visible`);
      document.querySelector(`body`).removeEventListener(`keydown`, hiddenModal);
    }
    popup.getElement()
      .querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, hiddenModal);
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

  renderAppend(popup.getElement().querySelector(`.film-details__inner`), new CommentsList(allComments.length).getElement(), `beforeend`);

  allComments.forEach((comment) => {
    renderAppend(popup.getElement().querySelector(`.film-details__comments-list`), new Comment(comment).getElement(), `beforeend`);
  });

  renderAppend(popup.getElement().querySelector(`.film-details__comments-wrap`), new CommentsNew().getElement(), `beforeend`);

  renderAppend(filmsContainers[containerIdx], film.getElement(), `beforeend`);

  render(`body`, popup.getElement(), `beforeend`);

  popup.getElement().style.display = `none`;
};

const filmsContainers = document.querySelectorAll(`.films-list__container`);

allFilms.slice(0, MAX_FILMS).map((film) => {
  renderFilms(film, 0);
});

sortArray(allFilms, `rating`, 2).map((film) => {
  renderFilms(film, 1);
});

sortArray(allFilms, `commentsCount`, 2).map((film) => {
  renderFilms(film, 2);
});


const LOAD_MORE_BTN = document.querySelector(`.films-list__show-more`);

const loadingFilm = (e) => {
  e.preventDefault();
  const currentCountFilms = document.querySelectorAll(`.films-list .films-list__container>.film-card`).length;
  const remainingFilms = allFilms.slice(currentCountFilms, currentCountFilms + MAX_FILMS).length;

  if (currentCountFilms + remainingFilms >= allFilms.length) {
    allFilms.slice(currentCountFilms, currentCountFilms + remainingFilms).map((film) => {
      return renderFilms(film, 0);
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
