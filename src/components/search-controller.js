import {AbstractComponent} from "./abstract-component";
import {SearchResult} from "./search-result";
import {Search} from "./search";

export class SearchController extends AbstractComponent{
  constructor(container) {
    this._container = container;
  }
}
