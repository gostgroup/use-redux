import React from 'react';
import { Store, createStore } from 'redux';

const reduxContext = React.createContext<Store>(createStore((s = {}) => s));

const { Provider: ReduxProvider } = reduxContext;

export {
  reduxContext,
  ReduxProvider,
};
