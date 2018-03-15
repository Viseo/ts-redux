import { store } from './store.js';
import { count, msg } from './selectors.js';

class CounterDisplay extends HTMLElement {
  private unsubscribe: Function;

  connectedCallback(): void {
    this.unsubscribe = store.subscribe(() => this.syncContent());
    this.syncContent();
  }

  disconnectedCallback(): void {
    this.unsubscribe();
  }

  private syncContent(): void {
    this.innerHTML = `${count()}<br>${msg()}`;
  }
}

customElements.define('counter-display', CounterDisplay);
