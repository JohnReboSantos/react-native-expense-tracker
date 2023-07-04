import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import useInit from './hooks/useInit';
import Loading from './components/Loading';
import { StoreProvider } from './stores';
import ExpenseForm from './components/ExpenseForm';

export default function App() {
  const {ready, store} = useInit();
  const Drawer = createDrawerNavigator();

  if (!ready || !store) {
    return <Loading />;
  }

  return (
    <StoreProvider value={store}>
    <NavigationContainer>
      <Drawer.Navigator>
      <Drawer.Screen name='Add an Expense' component={ExpenseForm} />
      </Drawer.Navigator>
    </NavigationContainer>
    </StoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
