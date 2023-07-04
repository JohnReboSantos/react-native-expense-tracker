import { Platform, StyleSheet, Text, TextInput, SafeAreaView, Pressable, GestureResponderEvent, View } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { observer } from 'mobx-react-lite'
import { TouchableOpacity } from "react-native-gesture-handler";
import { useStore } from "../stores";

const ExpenseForm = () => {
    const { expenseStore } = useStore();
    const [formData, setFormData] = useState({amount: 0, name: '', description: '', category: '', date: new Date().toDateString()})
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ( {type} : DateTimePickerEvent, chosenDate: Date | undefined ) => {
        if (type == "set") {
            setSelectedDate(chosenDate || new Date());

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setFormData({...formData, date: selectedDate.toDateString() || new Date().toDateString()})
            }
        } else {
            toggleDatepicker();
        }
    }

    const confirmIOSDate = () => {
        setFormData({...formData, date: selectedDate.toDateString()});
        toggleDatepicker();
    };

    const onSubmit = () => {
              
       if (formData.amount === 0) {
        alert('Amount is required');
        setFormData({amount: 0, name: '', description: '', category: '', date: new Date().toDateString()});
        return;
       }
       
       if (formData.name.trim().length === 0) {
        alert('Name is required');
        setFormData({amount: 0, name: '', description: '', category: '', date: new Date().toDateString()});
        return;
       }
       
       expenseStore.addExpense(formData.amount, formData.name, formData.description, formData.category, formData.date);
       alert(`Expense successfully added! Amount: ${formData.amount}. Name: ${formData.name}. Description: ${formData.description}. Category: ${formData.category}. Date: ${formData.date}`)
       setFormData({amount: 0, name: '', description: '', category: '', date: new Date().toDateString()});
    }

    return (
        <SafeAreaView>
           <TextInput style={styles.input} placeholder='Amount' value={formData.amount.toString()} onChangeText={e => setFormData({...formData, amount: parseInt(e) || 0})}/>
           <TextInput style={styles.input} placeholder='Name' value={formData.name} onChangeText={e => setFormData({...formData, name: e})}/>
           <TextInput style={[styles.input, { height: 80 }]} placeholder='Description' multiline value={formData.description} onChangeText={e => setFormData({...formData, description: e})}/>
           <TextInput style={styles.input} placeholder='Category' value={formData.category} onChangeText={e => setFormData({...formData, category: e})}/>
           {showPicker && (<DateTimePicker mode='date' display='spinner' value={selectedDate} onChange={onChange} style={styles.datePicker} />)}
           
           {showPicker && Platform.OS === 'ios' && (
           <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
            <TouchableOpacity style={[
                styles.button, styles.pickerButton, {backgroundColor: '#11182711'}
            ]} onPress={toggleDatepicker}>
                <Text style={[styles.buttonText, {color: '#075985'}]}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[
                styles.button, styles.pickerButton,
            ]} onPress={confirmIOSDate}>
                <Text style={[styles.buttonText]}>Confirm</Text>
            </TouchableOpacity>
           </View>
           )}

           {!showPicker && (<Pressable onPress={toggleDatepicker}>
            <TextInput style={[styles.input, { color: formData.date === '' ? 'gray' : 'black' }]} editable={false} onPressIn={toggleDatepicker} placeholder='Date' value={formData.date} onChangeText={e => setFormData({...formData, date: e})}/>
           </Pressable>)}
           <TouchableOpacity style={styles.button} onPress={onSubmit}>
            <Text>Submit</Text>
           </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 10,
      },
    buttonText: {
        fontSize: 14,
        fontWeight: '500',
        color: '#fff'
    },
    datePicker: {
        height: 120,
        marginTop: -10
      },
    pickerButton: {
        paddingHorizontal: 20
      }
})

export default observer(ExpenseForm);