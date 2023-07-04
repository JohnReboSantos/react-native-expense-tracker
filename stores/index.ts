import { model, Model, prop, registerRootStore } from "mobx-keystone";
import React from "react";
import Store from "./Store";
import ExpenseStore from "./ExpenseStore";

const StoreContext = React.createContext<Store>({} as Store);

const useStore = () => React.useContext(StoreContext);
const { Provider: StoreProvider } = StoreContext;

const createStore = () => {
    const expenseStore = new ExpenseStore({});
    const store = new Store({
        expenseStore
    });

    registerRootStore(store);

    return store;
}

export { Store, StoreProvider, createStore, useStore};