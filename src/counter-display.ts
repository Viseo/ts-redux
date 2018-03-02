import { store } from './store.js';
import { count } from './selectors.js';

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
    this.textContent = count().toString();
  }
}

customElements.define('counter-display', CounterDisplay);
