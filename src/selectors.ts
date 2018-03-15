import { Messages, Selector, createSelector } from './store.js';

export const count: Selector<number> = createSelector(state => state.count);

export const msg: Selector<Messages> = createSelector(state => state.message);
