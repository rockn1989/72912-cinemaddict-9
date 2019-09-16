import {AbstractComponent} from '../components/abstract-component.js';

export class FilmsSection extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<section class="films"></div>`;
  }
}
