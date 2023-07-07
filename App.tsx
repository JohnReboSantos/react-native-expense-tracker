import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import ExpenseDetail from './components/ExpenseDetail';
import ExpenseEdit from './components/ExpenseEdit';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import Loading from './components/Loading';
import useInit from './hooks/useInit';
import { StoreProvider } from './stores';

export default function App() {
  const { ready, store } = useInit();
  const Drawer = createDrawerNavigator();

  if (!ready || !store) {
    return <Loading />;
  }

  return (
    <StoreProvider value={store}>
      <NavigationContainer>
        <Drawer.Navigator drawerContent={() => null}>
          <Drawer.Screen name="Main" component={MainNavigator} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StoreProvider>
  );
}

function MainNavigator() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen name="ExpenseList" component={ExpenseList} />
      <Stack.Screen name="ExpenseForm" component={ExpenseForm} />
      <Stack.Screen name="ExpenseDetail" component={ExpenseDetail} />
      <Stack.Screen name="ExpenseEdit" component={ExpenseEdit} />
    </Stack.Navigator>
  );
}
