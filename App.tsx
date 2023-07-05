import 'react-native-gesture-handler';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
  // const Stack = createNativeStackNavigator();

  if (!ready || !store) {
    return <Loading />;
  }

  return (
    <StoreProvider value={store}>
      <NavigationContainer>
        <Drawer.Navigator>
          <Drawer.Screen name="ExpenseList" component={ExpenseList} />
          <Drawer.Screen name="ExpenseForm" component={ExpenseForm} />
          <Drawer.Screen name="ExpenseDetail" component={ExpenseDetail} />
          <Drawer.Screen name="ExpenseEdit" component={ExpenseEdit} />
        </Drawer.Navigator>
        {/* <Stack.Navigator>
          <Stack.Screen name="ExpenseList" component={ExpenseList} />
          <Stack.Screen name="ExpenseForm" component={ExpenseForm} />
          <Stack.Screen name="ExpenseDetail" component={ExpenseDetail} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </StoreProvider>
  );
}
