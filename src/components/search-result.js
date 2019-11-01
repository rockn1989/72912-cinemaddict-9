import {AbstractComponent} from "./abstract-component";

export class SearchResult extends AbstractComponent {
  constructor(resultCount) {
    super();
    this._resultCount = resultCount;
  }
  getTemplate() {
    return `<div class="result">
      <p class="result__text">Result <span class="result__count">${this._resultCount}</span></p>
    </div>
    `;
  }
}
