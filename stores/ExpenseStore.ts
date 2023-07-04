import { Model, model, modelAction, ModelCreationData, modelFlow, objectMap, prop, _async, _await } from "mobx-keystone";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';

import Expense from "../models/Expense";

@model('react-native-expense-tracker/ExpenseStore')
export default class ExpenseStore extends Model({
    expenses: prop(() => objectMap<Expense>())
}) {
    @modelAction
    addExpense = (amount: number, name: string, description: string, category: string, date: string) => {
        const id = uuidv4();
        const expense = new Expense({id, amount, name, description, category, date});
        this.expenses.set(expense.id, expense);
        console.log('this.expenses', this.expenses);
    };

    @modelAction
    deleteTodo = (id: string) => {
        if (!this.expenses.has(id)) {
            return;
        }
        this.expenses.delete(id);
    };
}