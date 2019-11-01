import {AbstractComponent} from "./abstract-component";

export class NoSearchResult extends AbstractComponent {
  constructor(message) {
    super();
    this._message = message;
  }
  getTemplate() {
    return `<section class="films-list">
      <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
      <div class="no-result">
        ${this._message}
      </div>
    </section>`;
  }
}
