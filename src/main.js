import {SearchResultController} from './components/search-result-controller.js';
import {FilmsController} from './components/films-controller.js';
import {getFilm} from '../src/mocks/card-data.js';

const COUNT_FILMS = 8;
const allFilms = [];

for (let i = 0; i < COUNT_FILMS; i++) {
  allFilms.push(getFilm(i));
}


const controller = new FilmsController(document.querySelector(`.main`), allFilms);
const searchController = new SearchResultController(document.querySelector(`.main`), allFilms);
controller.renderStatic();
controller.render();

document.querySelector(`.search__field`).addEventListener(`keyup`, (e) => {
  if (e.target.value.length >= 3) {
    searchController.renderSearch(e.target.value);
    searchController.resetFilmsData(allFilms);
  } else {
    searchController.resetFilmsData(allFilms);
  }

  if (e.target.value.length === 0) {
    controller.render();
  }
});

document.querySelector(`.search__reset`).addEventListener(`click`, () => {
  controller.render();
});

document.querySelector(`.footer__statistics p`).textContent = allFilms.length;
