import {createSearchTemplate} from '../src/components/search.js';
import {createUserProfileTemplate} from '../src/components/user-profile.js';
import {createSiteMenuTemplate} from '../src/components/site-menu.js';
import {createSortTemplate} from '../src/components/sort.js';
import {createFilmsWrapperTemplate} from '../src/components/films-wrapper.js';
import {createFilmsListTemplate} from '../src/components/films-list.js';
import {createFilmsListExtraTemplate} from '../src/components/films-list-extra.js';

import {getFilm} from '../src/components/card-data.js';
import {createCardTemplate} from '../src/components/card.js';

import {createPopupTemplates} from '../src/components/popup.js';

import {createTitleTemplates} from '../src/components/title.js';
import {createShowMoreBtnTemplate} from '../src/components/show-more-btn.js';

const renderComponent = (container, component, position) => {
  document.querySelector(container).insertAdjacentHTML(position, component);
};

renderComponent(`.header`, createSearchTemplate(), `beforeend`);
renderComponent(`.header`, createUserProfileTemplate(), `beforeend`);
renderComponent(`.main`, createSiteMenuTemplate(), `beforeend`);
renderComponent(`.main`, createSortTemplate(), `beforeend`);
renderComponent(`.main`, createFilmsWrapperTemplate(), `beforeend`);
renderComponent(`.films`, createFilmsListTemplate(), `beforeend`);
renderComponent(`.films-list`, createTitleTemplates(`All movies. Upcoming`, true), `afterbegin`);
renderComponent(`.films-list`, createShowMoreBtnTemplate(), `beforeend`);

for (let i = 0; i < 5; i++) {
  renderComponent(`.films-list .films-list__container`, new Array(1).fill(``).map(getFilm).map(createCardTemplate).join(``), `beforeend`);
}
//renderComponent(`.films`, createFilmsListExtraTemplate(`Top rated`), `beforeend`);
//renderComponent(`.films`, createFilmsListExtraTemplate(`Most commented`), `beforeend`);
renderComponent(`body`, createPopupTemplates(), `beforeend`);

document.querySelector('.film-details').style.display = 'none';
