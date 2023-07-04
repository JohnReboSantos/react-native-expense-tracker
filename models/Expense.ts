import {Model, model, modelAction, ModelCreationData, prop} from 'mobx-keystone'

@model('react-native-expense-tracker/Expense')
export default class Expense extends Model({
    id: prop<string>(''),
    amount: prop<number>(0),
    name: prop<string>(''),
    description: prop<string>(''),
    category: prop<string>(''),
    date: prop<Date>(() => new Date())
}) {
    @modelAction
    edit = (amount: number, name: string, description: string, category: string, date: Date) => {
        this.amount = amount;
        this.name = name;
        this.description = description;
        this.category = category;
        this.date = date;
    }
}