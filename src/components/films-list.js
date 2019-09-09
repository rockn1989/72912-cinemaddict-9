import {createElement, render} from '../components/utils.js';
import {Card} from '../components/card.js';

 const createFilmsListTemplate = () => `<section class="films-list">
  <div class="films-list__container"></div>
</section>`;

 export class FilmsList {
  constructor({title, columns, array}) {
    this._title = title || `undefined`;
    this._columns = columns || 1;
    this._filmsCard = array || [];
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<section class="${this._columns > 1 ? `films-list--extra` : `films-list`}">
      ${this._title != `undefined` ? `<h2 class="films-list__title">${this._title}</h2>` : ``}
      <div class="films-list__container"></div>
      ${this._columns === 1 ? `<button class="films-list__show-more">Show more</button>` : ``}
    </section>`;
  }
}
