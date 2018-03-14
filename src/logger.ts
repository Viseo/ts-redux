import { Action, Reducer } from './redux.js';

export function log<T, U extends Action<any> = Action<any>>(
  reducer: Reducer<T, U>,
  prefix: string = 'Logger'
): Reducer<T, U> {
  return (oldState, action) => {
    const newState: T = reducer(oldState, action);
    console.group(prefix + ' -> ' + action.type);
    console.log('Old state', oldState);
    console.log('Payload', action.payload);
    console.log('New state', newState);
    console.groupEnd();
    return newState;
  }
}
