import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';

const ExpenseDetail = ({ route }: any) => {
  const { itemId, itemAmount, itemName, itemDescription, itemCategory, itemDate } = route.params;
  const navigation = useNavigation();

  const navigateToEdit = () => {
    navigation.navigate('ExpenseEdit', {
      editId: itemId,
      editAmount: itemAmount,
      editName: itemName,
      editDescription: itemDescription,
      editCategory: itemCategory,
      editDate: itemDate,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.editButton} onPress={navigateToEdit}>
        <Ionicons name="pencil" size={24} color="black" />
      </TouchableOpacity>
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
  editButton: {
    alignSelf: 'flex-end',
    padding: 8,
    borderRadius: 8,
  },
});

export default observer(ExpenseDetail);
