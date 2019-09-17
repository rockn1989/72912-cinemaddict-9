import {Search} from '../components/search.js';
import {getUserStatus} from '../mocks/user-profile-data.js';
import {UserProfile} from '../components/user-profile.js';
import {MenuWrapper} from '../components/site-menu.js';
import {Link} from '../components/site-menu-link.js';

export class PageController {
  constructor(container, {films, comments}) {
    this._container = container;
    this._headerContainer = document.querySelector(`.header`);
    this._films = films;
    this._comments = comments;
    this._filters = [`All films`, `Watchlist`, `History`, `Favorite`, `Stats`];
  }

  _renderStatic() {
    this._headerContainer.append(new Search().getElement());
    this._headerContainer.append(new UserProfile(getUserStatus(this._films.filter(({ hasWatched }) => hasWatched).length)).getElement());
    this._container.append(new MenuWrapper().getElement());
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
          filterCount = this._films.filter(({ hasWatched }) => hasWatched).length;
          break;
        case `Favorite`:
          filterCount = this._films.filter(({ isFavorite }) => isFavorite).length;
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
      this._container.querySelector('.main-navigation').append(new Link(filter).getElement());
    });
  }

  init() {
    this._renderStatic();
    this._renderFilters();
  }
}
