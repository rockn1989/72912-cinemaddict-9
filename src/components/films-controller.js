import {PageController} from "./page-controller";
import {MenuWrapper} from './site-menu.js';
import {Sort} from './sort.js';
import {FilmsList} from './films-list.js';
import {Link} from './site-menu-link.js';
import {clearContainer} from './utils.js';
import {Statistics} from './statistics.js';

export class FilmsController extends PageController {
  constructor(container, films) {
    super(container, films);

  }

  _renderStatistics() {
    this._container.append(new Statistics().getElement());
    this.hideStatistics();
  }

  render() {
    this.init();
  }

  init() {
    clearContainer(this._container);
    this._renderStatistics();
    this._renderMenu();
    this._renderSuperFilms();
  }

  _renderMenu() {
    this._container.append(new MenuWrapper().getElement());
    this._container.append(new Sort().getElement());
    this._addHandlers();
    this._renderFilters();
  }

  _renderFilmsList() {
    this._filmsContainer.append(new FilmsList({title: `All movis Upcoming`, isHidden: true}).getElement());
    this._filmsContainer.append(new FilmsList({title: `Top rated`, columns: 2}).getElement());
    this._filmsContainer.append(new FilmsList({title: `Most commented`, columns: 2}).getElement());
    this._renderSettingsFilms();
  }

  _addHandlers() {
    this._container.querySelector(`.main-navigation`).addEventListener(`click`, (e) => {
      if (e.target.getAttribute(`href`) === `#stats`) {
        this.toggleStatistics();
      } else {
        this.hideStatistics();
        clearContainer(this._container.querySelector(`.films-list .films-list__container`));
        let filtredFilms = [];
        switch (e.target.getAttribute(`href`)) {
          case `#watchlist`:
            filtredFilms = this._films.filter(({hasWatchlist}) => hasWatchlist);
            break;
          case `#history`:
            filtredFilms = this._films.filter(({hasWatched}) => hasWatched);
            break;
          case `#favorite`:
            filtredFilms = this._films.filter(({isFavorite}) => isFavorite);
            break;
          default:
            filtredFilms = this._films;
        }
        this._renderFilms(filtredFilms);
        this._loadingFilm(filtredFilms);
      }
    });
  }

  _renderSettingsFilms() {
    [...this._films].sort((a, b) => b.rating - a.rating).slice(0, 2).forEach((film) => {
      this._createFilm(film, 1);
    });

    [...this._films].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2).forEach((film) => {
      this._createFilm(film, 2);
    });
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

  showStatistics() {
    this._container.querySelector(`.statistic`).classList.remove(`visually-hidden`);
  }

  hideStatistics() {
    this._container.querySelector(`.statistic`).classList.add(`visually-hidden`);
  }

  toggleStatistics() {
    if (this._container.querySelector(`.statistic`).classList.contains(`visually-hidden`)) {
      this.showStatistics();
    } else {
      this.hideStatistics();
    }
  }

}
