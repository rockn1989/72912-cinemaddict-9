import {PageController} from './components/page-controller.js';
import {getFilm} from '../src/mocks/card-data.js';
import {Statistics} from './components/statistics.js';

const COUNT_FILMS = 8;
const allFilms = [];

for (let i = 0; i < COUNT_FILMS; i++) {
  allFilms.push(getFilm(i));
}


document.querySelector(`.main`).append(new Statistics().getElement());

const controller = new PageController(document.querySelector(`.main`), allFilms);
controller.init();
controller.hideStatistics();

document.querySelector(`.footer__statistics p`).textContent = allFilms.length;
