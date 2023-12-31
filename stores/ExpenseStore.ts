import { polyfillWebCrypto } from 'expo-standard-web-crypto';
import { Model, model, modelAction, objectMap, prop } from 'mobx-keystone';
import { v4 as uuidv4 } from 'uuid';

import Expense from '../models/Expense';

polyfillWebCrypto();

@model('react-native-expense-tracker/ExpenseStore')
export default class ExpenseStore extends Model({
  expenses: prop(() => objectMap<Expense>()),
}) {
  @modelAction
  addExpense = (
    amount: number,
    name: string,
    description: string,
    category: string,
    date: string
  ) => {
    const id = uuidv4();
    const expense = new Expense({ id, amount, name, description, category, date });
    this.expenses.set(expense.id, expense);
  };

  @modelAction
  editExpense = (
    id: string,
    amount: number,
    name: string,
    description: string,
    category: string,
    date: string
  ) => {
    if (!this.expenses.has(id)) {
      return;
    }
    const expense = this.expenses.get(id);
    if (expense) {
      expense.amount = amount;
      expense.name = name;
      expense.description = description;
      expense.category = category;
      expense.date = date;
    }
  };

  @modelAction
  deleteExpense = (id: string) => {
    if (!this.expenses.has(id)) {
      return;
    }
    this.expenses.delete(id);
  };
}
