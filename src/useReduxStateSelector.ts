import * as React from 'react';
import { Store } from 'redux';

import { reduxContext } from './context';

/**
 * Более предпочтительный способ для вытаскивания данных из стора.
 * В отличии от useReduxStateMapper
 * эта функция подписывается на изменение только нужного куска стора.
 */
const useReduxStateSelector = <T extends {}, R extends {}>(
  selector: (state: T) => R,
) => {
  const store = React.useContext<Store<T>>(reduxContext);
  const [stateChunk, setState] = React.useState(
    selector(store.getState()),
  );

  React.useEffect(() => {
    let prevStateChunk = stateChunk;
    let unmounted = false;

    const unsubscribe = store.subscribe(() => {
      const newChunk = selector(store.getState());

      if (prevStateChunk !== newChunk) {
        prevStateChunk = newChunk;

        if (!unmounted) setState(newChunk);
      }
    });

    return () => {
      unmounted = true;
      unsubscribe();
    };
  }, []);

  return stateChunk;
};

export default useReduxStateSelector;
