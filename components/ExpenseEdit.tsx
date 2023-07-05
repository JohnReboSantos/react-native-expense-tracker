import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native';

import { useStore } from '../stores';

const ExpenseEdit = ({ route }: any) => {
  const { id, amount, name, description, date } = route.params;
  const { expenseStore } = useStore();
  const handleDelete = () => expenseStore.deleteExpense(id);
  return (
    <SafeAreaView>
      <Text>This is edit</Text>
      <Text>Amount: $ {amount}</Text>
      <Text>Name: {name}</Text>
      <Text>Description: {description}</Text>
      <Text>Date: {date}</Text>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.buttonText}>Delete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default observer(ExpenseEdit);
