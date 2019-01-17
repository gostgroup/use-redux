import * as React from 'react';
import { Store } from 'redux';

import { reduxContext } from './context';

const useReduxStoreInstance = <T extends {} = {}>() => {
  const store = React.useContext<Store<T>>(reduxContext);

  return store;
};

export default useReduxStoreInstance;
