import {AbstractComponent} from '../components/abstract-component.js';

export class FilmsSection extends AbstractComponent {
  getTemplate() {
    return `<section class="films"></section>`;
  }
}
