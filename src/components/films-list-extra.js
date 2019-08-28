import {createTitleTemplates} from '../components/title.js';
import {render} from '../components/utils.js';
import {Card} from '../components/card.js';

const createFilmsListExtraTemplate = (filmdData, titleName) => `<section class="films-list--extra">
  ${createTitleTemplates(titleName)}
  <div class="films-list__container">
    ${filmdData.forEach((film) => {
      //console.log(new Card(film).getElement());
      //render(`.films-list__container`, new Card(film).getElement(), `beforeend`);
      new Card(film).getElement();
    })}
  </div>
</section>`;

export {createFilmsListExtraTemplate};

