import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, SafeAreaView } from 'react-native';

const ExpenseEdit = ({ route }: any) => {
  const { itemAmount, itemName, itemDescription, itemDate } = route.params;
  return (
    <SafeAreaView>
      <Text>This is edit</Text>
      <Text>Amount: $ {itemAmount}</Text>
      <Text>Name: {itemName}</Text>
      <Text>Description: {itemDescription}</Text>
      <Text>Date: {itemDate}</Text>
    </SafeAreaView>
  );
};

export default observer(ExpenseEdit);
