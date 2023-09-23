import {categories} from '../util.ts';

interface Props {
  onSelectCategory: (category: string) => void;
}

const ExpenseFilter = ({onSelectCategory}: Props) => {
  return (
    <select className="form-select" onChange={(event) => onSelectCategory(event.target.value)}>
      <option key="all" value="all">All categories</option>
      {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
    </select>
  );
};

export default ExpenseFilter;