import {AbstractComponent} from "./abstract-component";
import {Popup} from "./popup";
import {CommentsList} from '../components/comments-list.js';
import {Comment} from '../components/comment.js';
import {CommentsNew} from '../components/comments-new.js';

class MovieController extends AbstractComponent {
  constructor(container, {comments, popup}, onDataChange) {
    this._container = container;
    this._comments = comments;
    this._popup = popup;
    this._onDataChange = onDataChange.bind(this);
  }

  _onDataChange() {

  }

  _onChangeView() {

  }

  _createPopup() {
    const popup = new Popup(this._popup);

    const hiddenModal = function (evt) {
      if (evt.key === `Escape` || evt.key === `Esc` || evt.target.className === `film-details__close-btn`) {
        popup.getElement().style.display = `none`;
        popup.getElement().classList.remove(`visible`);
        document.querySelector(`body`).removeEventListener(`keydown`, hiddenModal);
      }
      popup.getElement()
        .querySelector(`.film-details__close-btn`)
        .removeEventListener(`click`, hiddenModal);
    };
    popup.getElement()
      .querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, hiddenModal);

    popup.getElement().querySelector(`.film-details__inner`).append(new CommentsList(this._comments.length).getElement());

    this._comments.forEach((comment) => {
      popup.getElement().querySelector(`.film-details__comments-list`).append(new Comment(comment).getElement());
    });

    popup.getElement().querySelector(`.film-details__comments-wrap`).append(new CommentsNew().getElement());

    this._container.append(popup.getElement());

    popup.getElement().style.display = `none`;
  }

  init(){
    this._createPopup();
  }
}
