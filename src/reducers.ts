import { Reducer } from './redux.js';
import { logger } from './logger.js';
import { Actions, CountActions } from './actions.js';

export const count: Reducer<number, CountActions> = logger(
  (state = 0, action) => {
    switch (action.type) {
      case Actions.Increment: return state + action.payload;
      case Actions.Decrement: return state - action.payload;
      default: return state;
    }
  },
  'count'
);
