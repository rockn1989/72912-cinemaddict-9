import {Popup} from "./popup";
import {CommentsList} from '../components/comments-list.js';
import {Comment} from '../components/comment.js';
import {CommentsNew} from '../components/comments-new.js';

export class MovieController {
  constructor(container, filmData, comments, onDataChange) {
    this._container = container;
    this._film = filmData;
    this._comments = comments;
    this._popup = new Popup(this._film);
    this._onDataChange = onDataChange;
    this.show = this.show.bind(this);
    this.hidden = this.hidden.bind(this);
  }

  show(evt) {
    evt.preventDefault();
    this._popup.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this.hidden);

    this._popup.getElement().style.display = `block`;
    this._popup.getElement().classList.add(`visible`);
    document.querySelector(`body`).addEventListener(`keydown`, this.hidden);
  }

  hidden(evt) {
    if (evt.key === `Escape` || evt.key === `Esc` || evt.target.className === `film-details__close-btn`) {
      this._popup.getElement().style.display = `none`;
      this._popup.getElement().classList.remove(`visible`);
      document.querySelector(`body`).removeEventListener(`keydown`, this.hidden);
    }
    this._popup.getElement()
      .querySelector(`.film-details__close-btn`)
      .removeEventListener(`click`, this.hidden);
  }

  _renderPopup() {
    const popupData = this._film;

    this._popup.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this.hidden);

    this._popup.getElement()
      .querySelector(`.film-details__controls`)
      .addEventListener(`click`, (e) => {
        if(e.target.tagName === `LABEL`) {
          let input;

          if (e.target.classList.contains(`film-details__control-label--watchlist`)) {
            input = e.target.previousElementSibling;
            if (input.hasAttribute(`checked`)) {
              input.removeAttribute(`checked`);
              popupData.hasWatchlist = false;
            } else {
              input.setAttribute(`checked`, true);
              popupData.hasWatchlist = true;
            }
          }
          if (e.target.classList.contains(`film-details__control-label--watched`)) {
            input = e.target.previousElementSibling;
            if (input.hasAttribute(`checked`)) {
              input.removeAttribute(`checked`);
              popupData.hasWatched = false;
            } else {
              input.setAttribute(`checked`, true);
              popupData.hasWatched = true;
            }
          }
          if (e.target.classList.contains(`film-details__control-label--favorite`)) {
            input = e.target.previousElementSibling;
            if (input.hasAttribute(`checked`)) {
              input.removeAttribute(`checked`);
              popupData.isFavorite = false;
            } else {
              input.setAttribute(`checked`, true);
              popupData.isFavorite = true;
            }
          }
          console.log(popupData);
          this._onDataChange(popupData);
        }
      });

    this._popup.getElement().querySelector(`.film-details__inner`).append(new CommentsList(this._comments.length).getElement());

    this._comments.forEach((comment) => {
      this._popup.getElement().querySelector(`.film-details__comments-list`).append(new Comment(comment).getElement());
    });

    this._popup.getElement().querySelector(`.film-details__comments-wrap`).append(new CommentsNew().getElement());

    this._container.append(this._popup.getElement());

    this._popup.getElement().style.display = `none`;
  }

  init(){
    this._renderPopup();
  }
}
