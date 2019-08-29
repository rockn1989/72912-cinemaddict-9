import {createTitleTemplates} from '../components/title.js';
import {render} from '../components/utils.js';
import {Card} from '../components/card.js';

const createFilmsListExtraTemplate = (filmdData, titleName) => `<section class="films-list--extra">
  ${createTitleTemplates(titleName)}
  <div class="films-list__container">
  ${filmdData.map((film) => {
    console.log(new Card(film).getElement());
  }).join(``)}
  </div>
</section>`;

/* const createFilmsListExtraTemplate = (titleName) => `<section class="films-list--extra">
  ${createTitleTemplates(titleName)}
  <div class="films-list__container"></div>
</section>`; */


export {createFilmsListExtraTemplate};

