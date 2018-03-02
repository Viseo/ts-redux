import { Selector, createSelector } from './store.js';

export const count: Selector<number> = createSelector(state => state.count);
