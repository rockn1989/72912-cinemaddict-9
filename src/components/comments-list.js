import {AbstractComponent} from '../components/abstract-component.js';

export class CommentsList extends AbstractComponent {
  constructor(commentsCount) {
    super();
    this._commentsCount = commentsCount;
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
