import * as React from 'react';
import { Store } from 'redux';
import shallowequal from 'shallowequal';

import { reduxContext } from './context';

/**
 * Используется в случае, если useReduxStateSelector не подходит.
 * Аналог mapStateToProps из react-redux
 */
const useReduxStateMapper = <T extends {}, R extends {}>(
  mapState: (state: T) => R,
) => {
  const store = React.useContext<Store<T>>(reduxContext);
  const [mappedState, setState] = React.useState(
    mapState(store.getState()),
  );

  React.useEffect(() => {
    let prevMappedState = mappedState;
    let unmounted = false;

    const unsubscribe = store.subscribe(() => {
      const newMappedState = mapState(store.getState());

      if (!shallowequal(prevMappedState, newMappedState)) {
        prevMappedState = newMappedState;
        if (!unmounted) setState(newMappedState);
      }
    });

    return () => {
      unmounted = true;
      unsubscribe();
    };
  }, []);

  return mappedState;
};

export default useReduxStateMapper;
