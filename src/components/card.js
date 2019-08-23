export const createCardTemplate = ({ title, rating, dateRealease, duration, genre, imgName, description, commentsCount, hasWatchlist, hasWatched, isFavorite }) => `<article class="film-card">
          <h3 class="film-card__title">${Array.from(title)[Math.floor(Math.random() * title.size)]}</h3>
          <p class="film-card__rating">${rating}</p>
          <p class="film-card__info">
            <span class="film-card__year">${new Date(dateRealease).toDateString()}</span>
            <span class="film-card__duration">${new Date(duration).getHours()}h</span>
            <span class="film-card__genre">${genre}</span>
          </p>
          <img src="./images/posters/${imgName}" alt="" class="film-card__poster">
          <p class="film-card__description">${description.length > 140 ? description.substring(0, 139) + `...` : description}</p>
  <a class="film-card__comments">${commentsCount} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${hasWatchlist ? `film-card__controls-item--active` : ``}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${hasWatched ? `film-card__controls-item--active` : ``}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorite ? `film-card__controls-item--active` : ``}">Mark as favorite</button>
  </form>
        </article > `;
