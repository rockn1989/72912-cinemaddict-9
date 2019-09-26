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
import {MovieController} from '../components/movie-controller.js';

export class PageController {
  constructor(container, {films, comments}) {
    this._container = container;
    this._headerContainer = document.querySelector(`.header`);
    this._films = films;
    this._comments = comments;
    this._filters = [`All films`, `Watchlist`, `History`, `Favorite`, `Stats`];
  }

  onDataChange(newData) {
    //console.log(newData);
    this._films[this._films.findIndex((it) => it.title === newData.title)] = newData;
    this._renderFilms();
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

  _renderFilms() {
    const MAX_RENDER_FILMS = 5;

    this._films.slice(0, MAX_RENDER_FILMS).map((firstFilm) => {
      this._createFilm(firstFilm, 0);
    });
  }

  _createFilm(filmMock, containerIdx) {
    const film = new Card(filmMock);
    const popup = new MovieController(this._container, filmMock, this._comments, this.onDataChange);
    popup.init();

    const filmsContainers = document.querySelectorAll(`.films-list__container`);

    film.getElement()
      .querySelector(`.film-card__title`)
      .addEventListener(`click`, popup.show);
    film.getElement()
      .querySelector(`.film-card__poster`)
      .addEventListener(`click`, popup.show);
    film.getElement()
      .querySelector(`.film-card__comments`)
      .addEventListener(`click`, popup.show);

    filmsContainers[containerIdx].append(film.getElement());
  }

  _renderSettingsFilms() {
    this._films.sort((a, b) => b[`rating`] - a[`rating`]).slice(0, 2).map((film) => {
      this._createFilm(film, 1);
    });

    this._films.sort((a, b) => b[`commentsCount`] - a[`commentsCount`]).slice(0, 2).map((film) => {
      this._createFilm(film, 2);
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
          return this._createFilm(film, 0);
        });

        LOAD_MORE_BTN.removeEventListener(`click`, loadingFilm);
        LOAD_MORE_BTN.remove();
      } else {
        this._films.slice(currentCountFilms, currentCountFilms + MAX_FILMS).map((film) => {
          this._container.querySelector(`.films-list .films-list__container`).append(this._createFilm(film));
        });
      }
    };

    LOAD_MORE_BTN.addEventListener(`click`, loadingFilm);
  }

  init() {
    this._renderStatic();
    this._renderFilters();
    this._renderFilms();
    this._renderSettingsFilms();
    this._loadingFilm();
  }
}
