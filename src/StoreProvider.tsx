import * as React from 'react';
import { Store } from 'redux';

import { ReduxProvider } from './context';

const StoreProvider: React.FC<{ store: Store }> = props => (
  <ReduxProvider value={props.store}>
    {props.children}
  </ReduxProvider>
);

export default React.memo(StoreProvider);
