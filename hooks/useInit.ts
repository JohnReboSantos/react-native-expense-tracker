import { useEffect, useState } from 'react';

import { createStore, Store } from '../stores';

const useInit = () => {
  const [ready, setReady] = useState(false);
  const [store, setStore] = useState<Store>();

  useEffect(() => {
    (async () => {
      const store = createStore();
      setStore(store);
      setReady(true);
    })();
  }, []);

  return {
    ready,
    store,
  };
};

export default useInit;
