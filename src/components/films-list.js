import {AbstractComponent} from '../components/abstract-component.js';

export class FilmsList extends AbstractComponent {
  constructor({title, columns, array}) {
    super();
    this._title = title || `undefined`;
    this._columns = columns || 1;
    this._filmsCard = array || [];
  }

  getTemplate() {
    return `<section class="${this._columns > 1 ? `films-list--extra` : `films-list`}">
      ${this._title !== `undefined` ? `<h2 class="films-list__title">${this._title}</h2>` : ``}
      <div class="films-list__container"></div>
      ${this._columns === 1 ? `<button class="films-list__show-more">Show more</button>` : ``}
    </section>`;
  }
}
