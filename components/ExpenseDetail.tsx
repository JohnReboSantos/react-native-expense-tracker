import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';

const ExpenseDetail = ({ route }: any) => {
  const { itemAmount, itemName, itemDescription, itemDate } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.itemAmount}>Amount: $ {itemAmount}</Text>
      <Text style={styles.itemName}>Name: {itemName}</Text>
      <Text style={styles.itemDescription}>Description: {itemDescription}</Text>
      <Text style={styles.itemDate}>Date: {itemDate}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  itemAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  itemName: {
    fontSize: 14,
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 12,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default observer(ExpenseDetail);
