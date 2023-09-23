import {useState} from 'react';
import {FieldValues} from 'react-hook-form';
import ExpenseForm from './components/ExpenseForm.tsx';
import ExpenseList from './components/ExpenseList.tsx';
import ExpenseFilter from './components/ExpenseFilter.tsx';
import type {Expense} from './util.ts';

const App = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    {id: 1, description: 'Item 1', amount: 100, category: 'groceries'},
    {id: 2, description: 'Item 2', amount: 200, category: 'utilities'},
    {id: 3, description: 'Item 3', amount: 150, category: 'entertainment'},
    {id: 4, description: 'Item 4', amount: 70, category: 'groceries'},
    {id: 5, description: 'Item 5', amount: 60, category: 'utilities'},
    {id: 6, description: 'Item 6', amount: 300, category: 'entertainment'},
  ]);

  const [selectedCategory, setSelectedCategory] = useState('all');

  const filtered = selectedCategory === 'all'
    ? expenses
    : expenses.filter(item => item.category === selectedCategory);

  const onSubmit = (data: FieldValues) => {
    console.log(data);
    setExpenses([
      ...expenses,
      {
        id: data.id,
        description: data.description,
        amount: data.amount,
        category: data.category,
      },
    ]);
  };

  const onDelete = (id: number) => {
    setExpenses(expenses.filter(item => item.id !== id));
  };

  const handleSelectCategory = (category: string) => setSelectedCategory(category);

  return (
    <>
      <div className="mb-5">
        <ExpenseForm nextId={expenses.length + 1} onSubmit={onSubmit}/>
      </div>
      <div className="mb-3">
        <ExpenseFilter onSelectCategory={handleSelectCategory}/>
      </div>
      <ExpenseList expenses={filtered} onDelete={onDelete}/>
    </>
  );
};

export default App;