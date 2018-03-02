import { Increment, Decrement, CountActions } from './actions.js';
import { store } from './store.js';

const enum ActionValues {
  Decrement = 'decrement',
  Increment = 'increment',
}

class CounterButton extends HTMLElement {//HTMLButtonElement {
  constructor() {
    super();
    this.addEventListener('click', () => this.onClick());
  }

  private get value(): number {
    const value: number = parseInt(this.getAttribute('value'), 10);
    return isNaN(value) ? 1 : value;
  }

  private get action(): CountActions {
    switch (this.getAttribute('action')) {
      case ActionValues.Decrement: return new Decrement(this.value);
      case ActionValues.Increment: return new Increment(this.value);
      default: throw new Error('Action value not supported');
    }
  }

  private onClick(): void {
    store.dispatch(this.action);
  }
}

customElements.define('counter-button', CounterButton);//, { extends: 'button' });
