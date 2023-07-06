import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { reaction } from 'mobx';
import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ExpenseItem from './ExpenseItem';
import { useStore } from '../stores';

const ExpenseList = () => {
  const navigation = useNavigation();
  const { expenseStore } = useStore();
  const [expenses, setExpenses] = useState<
    {
      id: string;
      amount: number;
      name: string;
      description: string;
      category: string;
      date: string;
    }[]
  >([]);

  const getTotalBudget = useCallback(() => {
    let totalBudget = 0;
    expenseStore.expenses.forEach((expense) => {
      totalBudget += expense.amount;
    });
    return totalBudget;
  }, []);

  useEffect(() => {
    // Update expenses state when expenseStore changes
    const dispose = reaction(
      () =>
        Array.from(expenseStore.expenses.values()).sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        ),
      (newExpenses) => {
        setExpenses(newExpenses);
      }
    );

    return () => {
      // Cleanup the reaction when the component unmounts
      dispose();
    };
  }, []);

  const navigateToExpenseForm = () => {
    navigation.navigate('ExpenseForm' as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.totalExpenses}>Total Budget: $ {getTotalBudget()}</Text>
        <TouchableOpacity onPress={navigateToExpenseForm} style={styles.addButton}>
          <AntDesign name="plus" size={24} color="white" />
        </TouchableOpacity>
      </View>
      {expenses.length === 0 ? (
        <Text> Create your first entry! </Text>
      ) : (
        <FlatList
          data={expenses}
          renderItem={({ item }) => (
            <ExpenseItem
              id={item.id}
              amount={item.amount}
              name={item.name}
              description={item.description}
              category={item.category}
              date={item.date}
            />
          )}
          extraData={expenses}
          keyExtractor={(item) => item.id.toString()}
          style={styles.list}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  totalExpenses: {
    fontSize: 18,
    fontWeight: 'bold' as 'bold',
    marginBottom: 12,
  },
  addButton: {
    backgroundColor: '#075985',
    borderRadius: 16,
    padding: 8,
  },
  list: {
    flex: 1,
  },
});

export default observer(ExpenseList);
