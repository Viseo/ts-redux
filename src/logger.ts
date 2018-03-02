import { Action, Reducer } from './redux.js';

export function logger<T, U extends Action<any> = Action<any>>(
  reducer: Reducer<T, U>
): Reducer<T, U> {
  return (oldState, action) => {
    const newState: T = reducer(oldState, action);
    console.group(action.type);
    console.log('Old state', oldState);
    console.log('Payload', action.payload);
    console.log('New state', newState);
    console.groupEnd();
    return newState;
  }
}
