import {Popup} from "./popup";
import {unrender} from "./utils";

export class MovieController {
  constructor(container, filmData, onDataChange, onChangeView) {
    this._container = container;
    this._film = filmData;
    this._popup = new Popup(this._film);
    this._onDataChange = onDataChange;
    this._onChangeView = onChangeView;
    this.show = this.show.bind(this);
    this.hidden = this.hidden.bind(this);
    this.setDefaultView = this.setDefaultView.bind(this);
  }

  setDefaultView() {
    if (document.body.contains(this._popup.getElement())) {
      unrender(this._popup.getElement());
      this._popup.removeElement();
    }
  }

  show(evt) {
    evt.preventDefault();
    this._onChangeView();
    this._renderPopup();
    this._popup.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this.hidden);

    document.querySelector(`body`).addEventListener(`keydown`, this.hidden);
  }

  hidden(evt) {
    if (evt.key === `Escape` || evt.key === `Esc` || evt.target.className === `film-details__close-btn`) {
      this.setDefaultView();
      this._onDataChange(this._popup);
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
        if (e.target.tagName === `LABEL`) {
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

          this._onDataChange(popupData);
          this._popup.getStatus(popupData.hasWatched);
        }
      });

    this._popup.getElement()
      .querySelectorAll(`.film-details__comment`).forEach((comment) => {
        comment.addEventListener(`click`, (e) => {
          e.preventDefault();
          if (e.target.classList.contains(`film-details__comment-delete`)) {
            const commentId = [...this._popup.getElement().querySelectorAll(`.film-details__comment`)].indexOf(comment);
            this._film.comments.splice(commentId, 1);
            //this._popup._deleteMessage();
            //this._popup._renderComments();
            this._onDataChange(this._film);
          }
        });
      });

    this._container.append(this._popup.getElement());
  }
}
