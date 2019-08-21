import {createTitleTemplates} from '../components/title.js';
import {createCardTemplate} from '../components/card.js';
import {getFilm} from './card-data.js';

const CARDS_COUNT = 2;
let cardsList = ``;

cardsList += new Array(CARDS_COUNT).fill(``).map(getFilm).map(createCardTemplate).join(``);

const createFilmsListExtraTemplate = (titleName) => `<section class="films-list--extra">
  ${createTitleTemplates(titleName)}
  <div class="films-list__container">
    ${cardsList}
  </div>
</section>`;

export {createFilmsListExtraTemplate};

