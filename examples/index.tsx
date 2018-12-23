import * as React from 'react';
import * as ReactDom from 'react-dom';
import { useReduxDispatcher } from '../src/index';

const App = () => {
  const a = useReduxDispatcher();
  console.log(a);
  return null;
};

ReactDom.render(<App />, document.getElementById('app'));
