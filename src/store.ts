import { Store, combineReducers } from './redux.js';
import * as reducers from './reducers.js';

export type AppState = {
  count: number;
}

export type Extractor<T> = (state: AppState) => T;
export type Selector<T> = () => T;

export const store: Store<AppState> = new Store(combineReducers(reducers));

export function createSelector<T>(extractor: Extractor<T>): Selector<T> {
  return () => extractor(store.getState());
}
