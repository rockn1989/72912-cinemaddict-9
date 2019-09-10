import { createElement } from './utils.js';

export class CommentsList {
  constructor(commentsCount) {
    this._commentsCount = commentsCount;
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
    return `<div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._commentsCount}</span></h3>

        <ul class="film-details__comments-list">
        </ul>
      </section>
    </div>
  </form>`;
  }

}
