import * as React from 'react';
import * as ReactDom from 'react-dom';
import { useReduxDispatcher, StoreProvider, useReduxStateMapper } from '../src/index';
import { createStore } from 'redux';

const App: React.FC = () => {
  const dispatch = useReduxDispatcher();
  const value = useReduxStateMapper((s: { a: number }) => s);
  const a = useReduxStateMapper((s: { a: number }) => s.a);

  React.useEffect(() => {
    setInterval(() => {
      dispatch({ type: 'action' });
    }, 1000);
  }, []);

  return (
    <div>
      <div>{value.a}</div>
      <div>{a}</div>
    </div>
  );
};

ReactDom.render(
  <StoreProvider store={createStore((s: { a: number } = { a: 0 }) => ({ ...s, a: s.a + 1 }))}>
    <App />
  </StoreProvider>,
  document.getElementById('app'),
);
