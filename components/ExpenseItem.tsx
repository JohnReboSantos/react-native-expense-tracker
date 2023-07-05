import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

const ExpenseItem = ({
  id,
  amount,
  name,
  description,
  category,
  date,
}: {
  id: string;
  amount: number;
  name: string;
  description: string;
  category: string;
  date: string;
}) => {
  const navigation = useNavigation();
  const navigateToDetail = () => {
    navigation.navigate('ExpenseDetail', {
      itemAmount: amount,
      itemName: name,
      itemDescription: description,
      itemDate: date,
    });
  };
  return (
    <TouchableOpacity onPress={navigateToDetail} style={styles.itemContainer}>
      <Text style={styles.itemAmount}>Amount: $ {amount}</Text>
      <Text style={styles.itemName}>Name: {name}</Text>
      <Text style={styles.itemDescription}>Description: {description}</Text>
      <Text style={styles.itemCategory}>Category: {category}</Text>
      <Text style={styles.itemDate}>Date: {date}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
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
  itemCategory: {
    fontSize: 12,
    marginBottom: 4,
  },
  itemDate: {
    fontSize: 12,
    color: '#888',
  },
});

export default ExpenseItem;
