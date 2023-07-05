import { model, Model, prop } from 'mobx-keystone';

import ExpenseStore from './ExpenseStore';

@model('react-native-expense-tracker/Store')
export default class Store extends Model({
  expenseStore: prop<ExpenseStore>(),
}) {}
