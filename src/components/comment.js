export const createCommentTemplate = ({img, text, author, date}) => `<li class="film-details__comment">
            <span class="film-details__comment-emoji">
              <img src="./images/emoji/${img}" width="55" height="55" alt="emoji">
            </span>
            <div>
              <p class="film-details__comment-text">${text}</p>
              <p class="film-details__comment-info">
                <span class="film-details__comment-author">${author}</span>
                <span class="film-details__comment-day">${new Date(date).toDateString()} days ago</span>
                <button class="film-details__comment-delete">Delete</button>
              </p>
            </div>
          </li>`;
