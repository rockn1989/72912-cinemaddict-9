import {AbstractComponent} from '../components/abstract-component.js';
import {CommentsList} from '../components/comments-list.js';
import {Comment} from '../components/comment.js';
import {CommentsNew} from '../components/comments-new.js';
import {clearContainer, unrender} from '../components/utils.js';

export class Popup extends AbstractComponent {
  constructor({title, imgName, description, rating, dateRelease, duration, genre, hasWatchlist, hasWatched, isFavorite, writers, actors, country, comments}) {
    super();
    this._title = title;
    this._rating = rating;
    this._dateRelease = dateRelease;
    this._duration = duration;
    this._genre = genre;
    this._imgName = imgName;
    this._description = description;
    this._writers = writers;
    this._actors = actors;
    this._country = country;
    this._randomValueTitle = Math.random();
    this._hasWatchlist = hasWatchlist;
    this._hasWatched = hasWatched;
    this._isFavorite = isFavorite;
    this._comments = comments;
    this._commentsCount = comments.filter(({deleted}) => deleted === false).length;
    this.getStatus(hasWatched);
    this.setFilmRating();
    this._renderComments();
  }

  getTemplate() {
    return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="form-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="./images/posters/${this._imgName}" alt="">

            <p class="film-details__age">18+</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${this._title}</h3>
                <p class="film-details__title-original">Original: ${this._title}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${this._rating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">Anthony Mann</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${this._writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${this._actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${new Date(this._dateRelease).toDateString()}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${new Date(this._duration).getHours()}h ${new Date(this._duration).getMinutes()}m</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${this._country}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${this._genre.map((genreType) => `<span class="film-details__genre">${genreType}</span>`).join(``)}
              </tr>
            </table>

            <p class="film-details__film-description">
              ${this._description}
            </p>
          </div>
        </div>

        <section class="film-details__controls">
          <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${this._hasWatchlist ? `checked` : ``}>
          <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${this._hasWatched ? `checked` : ``}>
          <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

          <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${this._isFavorite ? `checked` : ``}>
          <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
        </section>

        <div class="form-details__middle-container">
          <section class="film-details__user-rating-wrap">
            <div class="film-details__user-rating-controls">
              <button class="film-details__watched-reset" type="button">Undo</button>
            </div>

            <div class="film-details__user-score">
              <div class="film-details__user-rating-poster">
                <img src="./images/posters/${this._imgName}" alt="film-poster" class="film-details__user-rating-img">
              </div>

              <section class="film-details__user-rating-inner">
                <h3 class="film-details__user-rating-title">${this._title}</h3>

                <p class="film-details__user-rating-feelings">How you feel it?</p>

                <div class="film-details__user-rating-score">
                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="1" id="rating-1">
                  <label class="film-details__user-rating-label" for="rating-1">1</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="2" id="rating-2">
                  <label class="film-details__user-rating-label" for="rating-2">2</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="3" id="rating-3">
                  <label class="film-details__user-rating-label" for="rating-3">3</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="4" id="rating-4">
                  <label class="film-details__user-rating-label" for="rating-4">4</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="5" id="rating-5">
                  <label class="film-details__user-rating-label" for="rating-5">5</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="6" id="rating-6">
                  <label class="film-details__user-rating-label" for="rating-6">6</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="7" id="rating-7">
                  <label class="film-details__user-rating-label" for="rating-7">7</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="8" id="rating-8">
                  <label class="film-details__user-rating-label" for="rating-8">8</label>

                  <input type="radio" name="score" class="film-details__user-rating-input visually-hidden" value="9" id="rating-9" checked>
                  <label class="film-details__user-rating-label" for="rating-9">9</label>

                </div>
              </section>
            </div>
          </section>
        </div>

      </div>
  </section>`;
  }

  getStatus(status) {
    if (status) {
      this.getElement().querySelector(`.form-details__middle-container`).style.display = `block`;
    } else {
      this.getElement().querySelector(`.form-details__middle-container`).style.display = `none`;
      this._resetRating();
    }
  }

  setFilmRating() {
    this.getElement()
      .querySelector(`.film-details__user-rating-score`)
      .addEventListener(`click`, (e) => {
        e.preventDefault();

        if (e.target.tagName === `LABEL`) {
          let input = e.target.previousElementSibling;

          if (input.hasAttribute(`checked`)) {
            input.removeAttribute(`checked`);
          } else {
            this._resetRating();
            input.setAttribute(`checked`, true);
          }
        }
      });
  }

  _resetRating() {
    const inputs = this.getElement().querySelector(`.film-details__user-rating-score`).querySelectorAll(`input`);
    inputs.forEach((input) => {
      input.removeAttribute(`checked`);
    });
  }

  _renderComments() {

    this.getElement().querySelector(`.film-details__inner`).append(new CommentsList(this._comments.length).getElement());

    this._comments.forEach((comment) => {
      this.getElement().querySelector(`.film-details__comments-list`).append(new Comment(comment).getElement());
    });

    this.getElement().querySelector(`.film-details__comments-wrap`).append(new CommentsNew().getElement());
    this._checkEmoji();
    this._sendMessage();
    this._deleteMessage();
  }

  _sendMessage() {
    this.getElement()
      .querySelector(`.film-details__comment-input`)
      .addEventListener(`focus`, () => {
        document.querySelector(`body`).addEventListener(`keydown`, (e) => {
          if (e.ctrlKey && e.key === `Enter`) {
            if (
              this.getElement().querySelector(`.film-details__add-emoji-label`).children.length > 0 &&
              this.getElement().querySelector(`.film-details__comment-input`).value.length > 0
            ) {
              const imageName = this.getElement().querySelector(`.film-details__add-emoji-label img`).getAttribute(`alt`);
              const text = this.getElement().querySelector(`.film-details__comment-input`).value;
              const newCommentData = {
                img: imageName,
                text: this._escapeHTML(text),
                date: Date.now()
              };

              this._comments.push(newCommentData);
              this._clearForm();
              unrender(this.getElement().querySelector(`.form-details__bottom-container`));
              this._renderComments(this._comments);
            }
          }
        });
      });
  }

  _deleteMessage() {
    this.getElement()
      .querySelectorAll(`.film-details__comment`).forEach((comment) => {
        comment.addEventListener(`click`, (e) => {
          e.preventDefault();
          if (e.target.classList.contains(`film-details__comment-delete`)) {
            const commentId = [...this.getElement().querySelectorAll(`.film-details__comment`)].indexOf(comment);
            this._comments.splice(commentId, 1);
            unrender(this.getElement().querySelector(`.form-details__bottom-container`));
            this._renderComments(this._comments);
          }
        });
      });
  }

  _escapeHTML(string) {
    return string.replace(/</g, `&lt;`)
      .replace(/>/g, `&gt;`)
      .replace(/"/g, `&quot;`)
      .replace(/'/g, `&#039;`);
  }

  _clearForm() {
    this.getElement().querySelector(`.film-details__comment-input`).value = ``;
    clearContainer(this.getElement().querySelector(`.film-details__add-emoji-label`));
  }

  _checkEmoji() {
    this.getElement()
      .querySelector(`.film-details__emoji-list`)
      .addEventListener(`click`, (e) => {
        e.preventDefault();
        if (e.target.tagName === `IMG`) {
          let newImg = new Image();
          let oldImg = this.getElement().querySelector(`.film-details__add-emoji-label img`);
          newImg.src = e.target.src;
          newImg.width = 55;
          newImg.height = 55;
          newImg.alt = `${e.target.alt}`;
          if (oldImg) {
            this.getElement().querySelector(`.film-details__add-emoji-label`).removeChild(oldImg);
          }

          this.getElement().querySelector(`.film-details__add-emoji-label`).append(newImg);
        }
      });
  }

}
