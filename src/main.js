import {PageController} from './components/page-controller.js';
import {getFilm} from '../src/mocks/card-data.js';
import {getPopupData} from '../src/mocks/popup-data.js';
import {getComment} from '../src/mocks/comment-data.js';


const COUNT_FILMS = 8;
const COUNT_COMMENTS = 4;

const allFilms = [];
const allComments = [];

for (let i = 0; i < COUNT_FILMS; i++) {
  allFilms.push(getFilm());
}

for (let i = 0; i < COUNT_COMMENTS; i++) {
  allComments.push(getComment());
}

const controller = new PageController(document.querySelector(`.main`), {films: allFilms, comments: allComments, popup: getPopupData()});
controller.init();

document.querySelector(`.footer__statistics p`).textContent = allFilms.length;
