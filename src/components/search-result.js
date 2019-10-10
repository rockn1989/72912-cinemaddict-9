import {AbstractComponent} from "./abstract-component";

export class SearchResult extends AbstractComponent{
  getTemplate() {
    return `
    <div class="result">
      <p class="result__text">Result <span class="result__count">1</span></p>
    </div>
    `;
  }
}
