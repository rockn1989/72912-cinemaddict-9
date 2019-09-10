import {createElement} from '../components/utils.js';

export class Comment {
  constructor({img, text, author, date}) {
    this._img = img;
    this._text = text;
    this._author = author;
    this._date = date;
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
    return `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${this._img}" width="55" height="55" alt="emoji">
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
/*
export const createCommentTemplate = ({img, text, author, date}) => `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${img}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${new Date(date).toDateString()} days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`; */
