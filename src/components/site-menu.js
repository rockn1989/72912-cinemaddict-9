import {AbstractComponent} from "./abstract-component";

export class MenuWrapper extends AbstractComponent {
  constructor() {
    super();
  }

  getTemplate() {
    return `<nav class="main-navigation"></nav>`;
  }
}
