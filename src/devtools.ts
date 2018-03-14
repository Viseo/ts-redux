import { Action, State } from './redux';

declare const window: Window & {
  __REDUX_DEVTOOLS_EXTENSION__: DevTools;
};

export interface DevToolsAction {
  state: string;
  type: string;
}

export type DevToolsSubscription = (action: DevToolsAction) => void;

export interface DevToolsConnection<T extends State> {
  send<U extends Action<any>>(action: U, state: T): void;
  subscribe(action: DevToolsSubscription): Function;
  unsubscribe(): void;
}

export interface DevTools {
  connect<T extends State>(): DevToolsConnection<T>;
}

function noop(): void {}

export const devTools: DevTools = window.__REDUX_DEVTOOLS_EXTENSION__ || {
  connect: () => ({
    subscribe: () => noop,
    unsubscribe: noop,
    send: noop
  })
};
