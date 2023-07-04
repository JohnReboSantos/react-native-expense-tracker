import { Platform, StyleSheet, Text, TextInput, SafeAreaView, Pressable, GestureResponderEvent } from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import React, { useState } from "react";
import { observer } from 'mobx-react-lite'
import { TouchableOpacity } from "react-native-gesture-handler";

export const ExpenseList = () => {
    const [formData, setFormData] = useState({amount: 0, name: '', description: '', category: '', date: ''})
    const [selectedDate, setSelectedDate] = useState(new Date())
    const [showPicker, setShowPicker] = useState(false);

    const toggleDatepicker = () => {
        setShowPicker(!showPicker);
    };

    const onChange = ( {type} : DateTimePickerEvent, chosenDate: Date | undefined ) => {
        if (type == "set") {
            const currentDate = chosenDate;
            setSelectedDate(currentDate || new Date());

            if (Platform.OS === 'android') {
                toggleDatepicker();
                setFormData({...formData, date: currentDate?.toDateString() || ''})
            }
        } else {
            toggleDatepicker();
        }
    }

    const onSubmit = (e: GestureResponderEvent) => {
       e.preventDefault();
       setFormData({...formData, date: selectedDate.toString()});
       alert(`Amount: ${formData.amount}. Name: ${formData.name}. Description: ${formData.description}. Category: ${formData.category}. Date: ${formData.date}`)
    }

    return (
        <SafeAreaView>
           <TextInput style={styles.input} placeholder='Amount' value={formData.amount.toString()} onChangeText={e => setFormData({...formData, amount: parseInt(e) || 0})}/>
           <TextInput style={styles.input} placeholder='Name' value={formData.name} onChangeText={e => setFormData({...formData, name: e})}/>
           <TextInput style={styles.input} placeholder='Description' multiline numberOfLines={4} value={formData.description} onChangeText={e => setFormData({...formData, description: e})}/>
           <TextInput style={styles.input} placeholder='Category' value={formData.category} onChangeText={e => setFormData({...formData, category: e})}/>
           {showPicker && (<DateTimePicker mode='date' display='spinner' value={selectedDate} onChange={onChange} />)}
           {!showPicker && (<Pressable onPress={toggleDatepicker}>
             <TextInput style={styles.input} editable={false} placeholder='Date' value={formData.date} onChangeText={e => setFormData({...formData, date: e})}/>
           </Pressable>)}
           <TouchableOpacity style={styles.button} onPress={() => onSubmit}>
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
      }
})