import {AbstractComponent} from '../components/abstract-component.js';

export class Card extends AbstractComponent {
  constructor({title, rating, dateRelease, duration, genre, imgName, description, commentsCount, hasWatchlist, hasWatched, isFavorite}) {
    super();
    this._title = title;
    this._rating = rating;
    this._dateRelease = dateRelease;
    this._duration = duration;
    this._genre = genre;
    this._imgName = imgName;
    this._description = description;
    this._commentsCount = commentsCount;
    this._hasWatchlist = hasWatchlist;
    this._hasWatched = hasWatched;
    this._isFavorite = isFavorite;
  }

  getTemplate() {
    return `<article class="film-card">
          <h3 class="film-card__title">${this._title}</h3>
          <p class="film-card__rating">${this._rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${new Date(this._dateRelease).toDateString()}</span>
            <span class="film-card__duration">${new Date(this._duration).getHours()}h</span>
            <span class="film-card__genre">${this._genre}</span>
          </p>
          <img src="./images/posters/${this._imgName}" alt="" class="film-card__poster">
          <p class="film-card__description">${this._description.length > 140 ? this._description.substring(0, 139) + `...` : this._description}</p>
          <a class="film-card__comments">${this._commentsCount} comments</a>
          <form class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${this._hasWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${this._hasWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite ${this._isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
          </form>
        </article > `;
  }
}
