import {createTitleTemplates} from '../components/title.js';
import {createCardTemplate} from '../components/card.js';

const createFilmsListExtraTemplate = (fildData, titleName) => `<section class="films-list--extra">
  ${createTitleTemplates(titleName)}
  <div class="films-list__container">
    ${fildData.map(createCardTemplate).join(``)}
  </div>
</section>`;

export {createFilmsListExtraTemplate};

