import {AbstractComponent} from '../components/abstract-component.js';

export class Comment extends AbstractComponent {
  constructor({img, text, author, date}) {
    super();
    this._img = img;
    this._text = text;
    this._author = author;
    this._date = date;
  }

  getTemplate() {
    return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${this._img}.png" width="55" height="55" alt="${this._img}">
            </span>
            <div>
              <p class="film-details__comment-text">${this._text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${this._author}</span>
                <span class="film-details__comment-day">${new Date(this._date).toDateString()} days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
  }

}
