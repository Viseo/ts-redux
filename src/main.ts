import './counter-button.js';
import './counter-display.js';

import { Increment, Decrement } from './actions.js';
import { store } from './store.js';
import { count } from './selectors.js';

const off: Function = store.subscribe(() => console.log('Count', count()));

console.group('Main')
store.dispatch(new Increment(10));
store.dispatch(new Decrement(42));
off();
store.dispatch(new Increment(50));
console.log('State', store.getState());
console.groupEnd();
