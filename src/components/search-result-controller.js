import {PageController} from "./page-controller.js";
import {SearchResult} from "./search-result.js";
import {NoSearchResult} from "./no-search-result.js";
import {FilmsList} from './films-list.js';
import {clearContainer} from '../components/utils.js';
export class SearchResultController extends PageController {
  constructor(container, films) {
    super(container, films);
  }

  _renderMenu() {
    this._container.append(new SearchResult(this._films.length).getElement());
  }

  _renderFilmsList() {
    this._filmsContainer.append(new FilmsList({title: `All movies. Upcoming`, isHidden: true}).getElement());
  }

  _comparison(innerString) {
    let string = innerString.toLowerCase();
    let result;
    [...result] = this._films.filter(({title}) => {
      return Boolean(title.toLowerCase().indexOf(string) + 1) === true;
    });
    return result;
  }

  resetFilmsData(films) {
    this._films = films;
  }

  renderSearch(searchString) {
    [...this._films] = this._comparison(searchString);
    if (this._films.length > 0) {
      this.init();
    } else {
      clearContainer(this._container);
      this._renderMenu();
      this._container.append(new NoSearchResult(`По вашему запросу ничего не найдено`).getElement());
    }

  }
}
