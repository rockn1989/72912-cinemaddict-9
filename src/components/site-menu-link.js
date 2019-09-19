import {AbstractComponent} from "./abstract-component";

export class Link extends AbstractComponent {
  constructor({title, anchor, count}) {
    super();
    this._title = title;
    this._anchor = anchor;
    this._count = count;
  }

  getTemplate() {
    return `<a href="#${this._anchor}" class="main-navigation__item ${this._title === `Stats` ? `main-navigation__item--additional` : ``}">${this._title} ${this._count !== null ? `<span class="main-navigation__item-count">${this._count}</span>` : ``}</a>`;
  }
}
