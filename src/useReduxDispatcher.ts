import React from 'react';
import { Store } from 'redux';

import { reduxContext } from './context';

const useReduxDispatcher = <T extends {} = {}>() => {
  const store = React.useContext<Store<T>>(reduxContext);

  return store.dispatch;
};

export default useReduxDispatcher;
