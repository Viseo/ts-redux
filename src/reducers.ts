import { Reducer } from './redux.js';
import { Messages } from './store.js';
import { Actions, CountActions } from './actions.js';

export const count: Reducer<number, CountActions> = (state = 0, action) => {
  switch (action.type) {
    case Actions.Increment: return state + action.payload;
    case Actions.Decrement: return state - action.payload;
    default: return state;
  }
};

export const message: Reducer<Messages, CountActions> = (
  state = Messages.Ko,
  action
) => {
  switch (action.type) {
    case Actions.Increment: return Messages.Ok;
    case Actions.Decrement: return Messages.Ko;
    default: return state;
  }
};
