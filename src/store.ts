import { Store, combineReducers } from './redux.js';
import * as reducers from './reducers.js';
import { log } from './logger.js';

export type State = {
  count: number;
};

export type Extractor<T> = (state: State) => T;
export type Selector<T> = () => T;

export const store: Store<State> = new Store(log(combineReducers(reducers)));

export function createSelector<T>(extractor: Extractor<T>): Selector<T> {
  return () => extractor(store.getState());
}
