import { Action } from './redux.js';

export const enum Actions {
  Init = '[Store] Init',
  Increment = '[Count] Increment',
  Decrement = '[Count] Decrement'
}

export class Increment extends Action<number> {
  readonly type: Actions = Actions.Increment;
}

export class Decrement extends Action<number> {
  readonly type: Actions = Actions.Decrement;
}

export type CountActions = Increment | Decrement;
