import {Expense} from '../util.ts';

interface Props {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

const ExpenseList = ({expenses, onDelete}: Props) => {
  if (expenses.length === 0) return null;

  return (
    <table className="table table-bordered">
      <thead>
      <tr>
        <th>Description</th>
        <th>Amount</th>
        <th>Category</th>
        <th></th>
      </tr>
      </thead>
      <tbody>
      {expenses.map(item => (
        <tr key={item.id}>
          <td>{item.description}</td>
          <td>$ {item.amount.toFixed(2)}</td>
          <td>{item.category}</td>
          <td>{<button className="btn btn-outline-danger" onClick={() => onDelete(item.id)}>Delete</button>}</td>
        </tr>
      ))}
      </tbody>
      <tfoot>
      <tr>
        <td>Total</td>
        <td>$ {expenses.reduce((acc, cur) => acc + cur.amount, 0).toFixed(2)}</td>
        <td></td>
        <td></td>
      </tr>
      </tfoot>
    </table>
  );
};

export default ExpenseList;