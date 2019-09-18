import {AbstractComponent} from "./abstract-component";

export class MenuWrapper extends AbstractComponent {
  getTemplate() {
    return `<nav class="main-navigation"></nav>`;
  }
}
