import {createElement} from '../components/utils.js';

export const getFilm = () => ({
  title: new Set([
    `Звездные войны`,
    `Титаник`,
    `Аватар`,
    `День сурка`,
    `Охотники за привидениями`,
    `Кинг-Конг`,
    `Пролетая над гнездом кукушки`,
    `Северное сияние`,
    `Форсаж`,
    `Мгла`,
    `Джеймс Бонд`,
    `Хранители`,
    `Бэтмен`,
    `Джентельмены удачи`,
    `Кавказкая пленница`,
  ]),
  imgName: [
    `made-for-each-other.png`,
    `popeye-meets-sinbad.png`,
    `sagebrush-trail.jpg`,
    `santa-claus-conquers-the-martians.jpg`,
    `the-dance-of-life.jpg`,
    `the-great-flamarion.jpg`,
    `the-man-with-the-golden-arm.jpg`,
  ][Math.floor(Math.random() * 7)],
  description: [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`,
  ][Math.floor(Math.random() * 3)],
  rating: (Math.random() * 10).toFixed(1),
  dateRealease: Date.now() + Math.floor(Math.random() * 24) * 24 * 60 * 60 * 1000,
  duration: Date.now() + Math.floor(Math.random() * 24) * 60 * 60 * 1000,
  genre: [
    `Comedy`,
    `Horror`,
    `Fantasy`,
    `Adventure`
  ][Math.floor(Math.random() * 4)],
  commentsCount: Math.floor(Math.random() * 1000),
  hasWatchlist: Boolean(Math.round(Math.random() * 1)),
  hasWatched: Boolean(Math.round(Math.random() * 1)),
  isFavorite: Boolean(Math.round(Math.random() * 1)),
});

class Card {
  constructor({ title, rating, dateRealease, duration, genre, imgName, description, commentsCount, hasWatchlist, hasWatched, isFavorite }) {
    this._title = title;
    this._rating = rating;
    this._dateRealease = dateRealease;
    this._duration = duration;
    this._genre = genre;
    this._imgName = imgName;
    this._description = description;
    this._commentsCount = commentsCount;
    this._hasWatchlist = hasWatchlist;
    this._hasWatched = hasWatched;
    this._isFavorite = isFavorite;
    this._element = null;
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate())
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  getTemplate() {
    return `<article class="film-card">
          <h3 class="film-card__title">${Array.from(this._title)[Math.floor(Math.random() * this._title.size)]}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${new Date(this._dateRealease).toDateString()}</span>
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
