import { Actions } from './actions.js';
import { DevToolsAction, DevToolsConnection, devTools } from './devtools.js';

export abstract class Action<T> {
  abstract readonly type: Actions;
  constructor(readonly payload: T = null) {}
}

class Init extends Action<void> {
  readonly type: Actions = Actions.Init;
}

export type State = {
  [key: string]: any;
};

export type Reducer<T, U extends Action<any> = Action<any>> = {
  (state: T, action: U): T;
};

export type Reducers<T extends State> = {
  [K in keyof T]: Reducer<T[K]>;
};

export function combineReducers<T extends State>(
  reducers: Reducers<T>
): Reducer<T> {
  // Use `Object.create(null)` to avoid potential prototypal issues.
  return (oldState: T = Object.create(null), action): T => {
    const newState: T = Object.create(null);

    // Let only changes through to know whether to return new or old state.
    return Object.keys(reducers).filter(key => {
      const oldValue: any = oldState[key];
      const newValue: any = reducers[key](oldValue, action);

      if (oldValue === newValue) { return false; }
      newState[key] = newValue;
      return true;

    }).length ? newState : oldState;
  };
}

export class Store<T extends State> {
  private state: T;
  private readonly emitter: DocumentFragment;
  private readonly event: string = 'dispatch';
  private readonly devTools: DevToolsConnection<T>;

  constructor(private readonly reducer: Reducer<T>) {
    // Easy way to handle event listeners.
    this.emitter = document.createDocumentFragment();
    this.devTools = devTools.connect();
    this.devTools.subscribe(action => this.onDevToolsAction(action));
    this.dispatch(new Init());
  }

  getState(): T {
    return this.state;
  }

  subscribe(callback: Function): Function {
    // Wrap callback to avoid it to return false or get access to arguments.
    function handler(): void { callback(); }
    this.emitter.addEventListener(this.event, handler);
    return () => { this.emitter.removeEventListener(this.event, handler); };
  }

  dispatch<T extends Action<any>>(action: T): void {
    this.setState(this.reducer(this.state, action));
    this.devTools.send(action, this.getState());
  }

  private setState(state: T): void {
    this.state = state;
    this.emitter.dispatchEvent(new Event(this.event));
  }

  private onDevToolsAction({ state, type }: DevToolsAction): void {
    if (type === 'DISPATCH') { this.setState(JSON.parse(state)); }
  }
}
