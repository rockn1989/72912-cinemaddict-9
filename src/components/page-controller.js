import {Search} from './search.js';
import {getUserStatus} from '../mocks/user-profile-data.js';
import {UserProfile} from './user-profile.js';
import {MenuWrapper} from './site-menu.js';
import {Sort} from './sort.js';
import {FilmsSection} from './films-wrapper.js';
import {FilmsList} from './films-list.js';
import {Link} from './site-menu-link.js';

import {Card} from '../components/card.js';
import {Popup} from '../components/popup.js';
import {CommentsList} from '../components/comments-list.js';
import {Comment} from '../components/comment.js';
import {CommentsNew} from '../components/comments-new.js';

export class PageController {
  constructor(container, {films, comments, popup}) {
    this._container = container;
    this._headerContainer = document.querySelector(`.header`);
    this._films = films;
    this._comments = comments;
    this._popup = popup;
    this._filters = [`All films`, `Watchlist`, `History`, `Favorite`, `Stats`];
  }

  _onDataChange(newData, oldData) {
    this._films[this._films.findIndex((it) => it === oldData)] = newData;
    this._renderFilms(this._films);
  }

  _renderStatic() {
    this._headerContainer.append(new Search().getElement());
    this._headerContainer.append(new UserProfile(getUserStatus(this._films.filter(({hasWatched}) => hasWatched).length)).getElement());
    this._container.append(new MenuWrapper().getElement());
    this._container.append(new Sort().getElement());
    this._container.append(new FilmsSection().getElement());
    this._filmsContainer = this._container.querySelector(`.films`);
    this._filmsContainer.append(new FilmsList({title: `All movies. Upcoming`, isHidden: true}).getElement());
    this._filmsContainer.append(new FilmsList({title: `Top rated`, columns: 2}).getElement());
    this._filmsContainer.append(new FilmsList({title: `Most commented`, columns: 2}).getElement());
  }

  _renderFilters() {
    const filtersMap = this._filters.map((filterName) => {
      let filterCount;
      switch (filterName) {
        case `All films`:
          filterCount = this._films.length;
          break;
        case `Watchlist`:
          filterCount = this._films.filter(({hasWatchlist}) => hasWatchlist).length;
          break;
        case `History`:
          filterCount = this._films.filter(({hasWatched}) => hasWatched).length;
          break;
        case `Favorite`:
          filterCount = this._films.filter(({isFavorite}) => isFavorite).length;
          break;
        case `Stats`:
          filterCount = null;
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

    filtersMap.forEach((filter) => {
      this._container.querySelector(`.main-navigation`).append(new Link(filter).getElement());
    });
  }

  _renderFilms(filmsData) {
    const MAX_RENDER_FILMS = 5;

    filmsData.slice(0, MAX_RENDER_FILMS).map((firstFilm) => {
      this._getData(firstFilm, 0);
    });
  }

  _getData(filmMock, containerIdx) {
    const film = new Card(filmMock);
    const popup = new Popup(this._popup);
    const filmsContainers = document.querySelectorAll(`.films-list__container`);

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

    popup.getElement().querySelector(`.film-details__inner`).append(new CommentsList(this._comments.length).getElement());

    this._comments.forEach((comment) => {
      popup.getElement().querySelector(`.film-details__comments-list`).append(new Comment(comment).getElement());
    });
    popup.getElement().querySelector(`.film-details__comments-wrap`).append(new CommentsNew().getElement());

    filmsContainers[containerIdx].append(film.getElement());
    this._container.append(popup.getElement());

    popup.getElement().style.display = `none`;
  }

  _renderSettingsFilms() {
    this._films.sort((a, b) => b[`rating`] - a[`rating`]).slice(0, 2).map((film) => {
      this._getData(film, 1);
    });

    this._films.sort((a, b) => b[`commentsCount`] - a[`commentsCount`]).slice(0, 2).map((film) => {
      this._getData(film, 2);
    });
  }

  _loadingFilm() {
    const LOAD_MORE_BTN = this._container.querySelector(`.films-list__show-more`);
    const MAX_FILMS = 5;
    const loadingFilm = (e) => {
      e.preventDefault();
      const currentCountFilms = document.querySelectorAll(`.films-list .films-list__container>.film-card`).length;
      const remainingFilms = this._films.slice(currentCountFilms, currentCountFilms + MAX_FILMS).length;

      if (currentCountFilms + remainingFilms >= this._films.length) {
        this._films.slice(currentCountFilms, currentCountFilms + remainingFilms).map((film) => {
          return this._getData(film, 0);
        });

        LOAD_MORE_BTN.removeEventListener(`click`, loadingFilm);
        LOAD_MORE_BTN.remove();
      } else {
        this._films.slice(currentCountFilms, currentCountFilms + MAX_FILMS).map((film) => {
          this._container.querySelector(`.films-list .films-list__container`).append(this._getData(film));
        });
      }
    };

    LOAD_MORE_BTN.addEventListener(`click`, loadingFilm);
  }

  init() {
    this._renderStatic();
    this._renderFilters();
    this._renderFilms(this._films);
    this._renderSettingsFilms();
    this._loadingFilm();
  }
}
