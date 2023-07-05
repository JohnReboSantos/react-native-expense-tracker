import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import {
  TextInput,
  View,
  Platform,
  Pressable,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { useStore } from '../stores';

const ExpenseEdit = ({ route }: any) => {
  const { editId, editAmount, editName, editDescription, editCategory, editDate } = route.params;
  const { expenseStore } = useStore();
  const [formData, setFormData] = useState({
    amount: editAmount,
    name: editName,
    description: editDescription,
    category: editCategory,
    date: editDate,
  });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const navigation = useNavigation();

  const toggleDatepicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }: DateTimePickerEvent, chosenDate: Date | undefined) => {
    if (type === 'set') {
      setSelectedDate(chosenDate || new Date());
      setFormData({
        ...formData,
        date: selectedDate.toDateString(),
      });

      if (Platform.OS === 'android') {
        toggleDatepicker();
      }
    } else {
      toggleDatepicker();
    }
  };

  const confirmIOSDate = () => {
    setFormData({ ...formData, date: selectedDate.toDateString() });
    toggleDatepicker();
  };

  const onSubmit = () => {
    if (formData.amount === 0) {
      alert('Amount is required');
      return;
    }

    if (formData.name.trim().length === 0) {
      alert('Name is required');
      return;
    }

    expenseStore.editExpense(
      editId,
      formData.amount,
      formData.name,
      formData.description,
      formData.category,
      formData.date
    );

    alert(
      `Expense successfully edited! Amount: ${formData.amount}. Name: ${formData.name}. Description: ${formData.description}. Category: ${formData.category}. Date: ${formData.date}`
    );

    navigation.navigate('ExpenseDetail', {
      itemId: editId,
      itemAmount: formData.amount,
      itemName: formData.name,
      itemDescription: formData.description,
      itemCategory: formData.category,
      itemDate: formData.date,
    });
  };

  const handleDelete = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            expenseStore.deleteExpense(editId);
            navigation.navigate('ExpenseList');
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input}
        placeholder="Amount"
        value={formData.amount.toString()}
        onChangeText={(e) => setFormData({ ...formData, amount: parseInt(e, 10) || 0 })}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={formData.name}
        onChangeText={(e) => setFormData({ ...formData, name: e })}
      />
      <TextInput
        style={[styles.input, { height: 180 }]}
        placeholder="Description"
        multiline
        value={formData.description}
        onChangeText={(e) => setFormData({ ...formData, description: e })}
      />
      <TextInput
        style={styles.input}
        placeholder="Category"
        value={formData.category}
        onChangeText={(e) => setFormData({ ...formData, category: e })}
      />
      {showPicker && (
        <DateTimePicker
          mode="date"
          display="spinner"
          value={selectedDate}
          onChange={onChange}
          style={styles.datePicker}
        />
      )}

      {showPicker && Platform.OS === 'ios' && (
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={[styles.button, styles.pickerButton, { backgroundColor: '#11182711' }]}
            onPress={toggleDatepicker}>
            <Text style={[styles.buttonText, { color: '#075985' }]}>Cancel</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.button, styles.pickerButton]} onPress={confirmIOSDate}>
            <Text style={[styles.buttonText]}>Confirm</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showPicker && (
        <Pressable onPress={toggleDatepicker}>
          <TextInput
            style={[styles.input, { color: formData.date === '' ? 'gray' : 'black' }]}
            editable={false}
            onPressIn={toggleDatepicker}
            placeholder="Date"
            value={formData.date}
            onChangeText={(e) => setFormData({ ...formData, date: e })}
          />
        </Pressable>
      )}
      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text>Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={handleDelete}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  datePicker: {
    height: 120,
    marginTop: -10,
  },
  pickerButton: {
    paddingHorizontal: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default observer(ExpenseEdit);
