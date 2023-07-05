import { registerRootStore } from 'mobx-keystone';
import React from 'react';

import ExpenseStore from './ExpenseStore';
import Store from './Store';

const StoreContext = React.createContext<Store>({} as Store);

const useStore = () => React.useContext(StoreContext);
const { Provider: StoreProvider } = StoreContext;

const createStore = () => {
  const expenseStore = new ExpenseStore({});
  const store = new Store({
    expenseStore,
  });

  registerRootStore(store);

  return store;
};

export { Store, StoreProvider, createStore, useStore };
