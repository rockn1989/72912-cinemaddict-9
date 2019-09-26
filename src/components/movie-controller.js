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
    this._onDataChange = onDataChange.bind(this);
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
    const popup = this._popup;
    const _that = this;
    const popupData = {
      title: this._film.title,
      imgName: this._film.imgName,
      description: this._film.description,
      rating: this._film.rating,
      dateRelease: this._film.dateRelease,
      duration: this._film.duration,
      genre: this._film.genre,
      writers: this._film.writers,
      actors: this._film.actors,
      country: this._film.country,
      commentsCount: this._film.commentsCount,
      hasWatchlist: this._film.hasWatchlist,
      hasWatched: this._film.hasWatched,
      isFavorite: this._film.isFavorite
    };

    this._popup.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, this.hidden);

    this._popup.getElement()
      .querySelector(`.film-details__controls`)
      .addEventListener(`click`, function (e) {
        let input;

        if (e.target.tagName === `LABEL` && e.target.classList.contains(`film-details__control-label--watchlist`)) {
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
          } else {
            input.setAttribute(`checked`, true);
          }
        }
        if (e.target.classList.contains(`film-details__control-label--favorite`)) {
          input = e.target.previousElementSibling;
          if (input.hasAttribute(`checked`)) {
            input.removeAttribute(`checked`);
          } else {
            input.setAttribute(`checked`, true);
          }
        }
        console.log(popupData.hasWatchlist);
        _that._onDataChange(popupData);
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
