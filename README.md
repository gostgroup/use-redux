# Redux in React without "wrapper hell"

## About library

React hooks for redux integration.
> ⚠️ Warning for a usage ⚠️
>
> Use it library carefully because current React Context API has some limitations for outer data subscribtions.
> More info here: [#14110 Provide more ways to bail out inside Hooks](https://github.com/facebook/react/issues/14110#issuecomment-458556208).

## API

### StoreProvider: [React.FC](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts)<{ store: [Store](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts) }>

The `StoreProvider` is just Redux store providing React component.

```typescript
ReactDom.render(
  <StoreProvider store={store} >
      <AppRootComponent />
  </StoreProvider>,
  appDomNode,
);
```


### useReduxDispatcher(): [Redux.Dispatch](https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react-redux/index.d.ts)

The `useReduxDispatcher` function returns Redux `dispatch` function for Redux action dispatching.

```typescript
import { actionCreator } from './actions';

const Component: React.FC = () => {
  const dispatch = useReduxDispatcher();

  const handleClick = React.useCallback(() => {
    dispatch(actionCreator());
  }, []);

  return (
    <button onClick={handleClick}>Push</button>
  );
};
```

### useReduxStateMapper(mapState: (state: T) => R): R

The `useReduxStateMapper` is like classic `mapStateToProps` from `react-redux` library.

```typescript
const Component: React.FC = () => {
  const { prop1, prop2 } = useReduxStateMapper(
    (state: RootAppState) => ({
      prop1: state.module1.prop1,
      prop2: state.module2.prop2,
    }),
  );

  // ...
};
```

### useReduxStateSelector(stateSelector: (state: T) => R): R

The `useReduxStateSelector` is more optimized version of `useReduxStateMapper` because the former subscribes only for selected piece of state changes instead the whole state like the latter.
> Selector function for `useReduxStateSelector` is just regular `reselect`-like selector.

```typescript
const Component: React.FC = () => {
  const { module1Prop1, module1Prop2 } = useReduxStateSelector(
    (state: RootAppState) => state.module1),
  );

  // ...
};
```
