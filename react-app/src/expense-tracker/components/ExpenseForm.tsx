import {zodResolver} from '@hookform/resolvers/zod';
import {FieldValues, useForm} from 'react-hook-form';
import {z} from 'zod';
import {categories} from '../util.ts';

const schema = z.object({
  id: z.number().min(0),
  description: z.string()
    .min(3, {message: 'Description must be at least 3 characters.'})
    .max(50, {message: 'Description must be up to 50 characters.'}),
  amount: z.number({invalid_type_error: 'Amount is required.'})
    .min(0.01, {message: 'Amount must be at least 0.01.'})
    .max(1_000_000, {message: 'Amount must be up to 1,000,000.'}),
  category: z.enum(categories, {errorMap: () => ({message: 'Select a category.'})}),
});

type ExpenseFormData = z.infer<typeof schema>

interface Props {
  nextId: number;
  onSubmit: (data: FieldValues) => void;
}

const ExpenseForm = ({nextId, onSubmit}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {errors, isValid},
  } = useForm<ExpenseFormData>({resolver: zodResolver(schema)});

  return (
    <form className="" onSubmit={handleSubmit((data) => {
      onSubmit(data);
      reset();
    })}>
      <input {...register('id', {valueAsNumber: true})} id="id" type="hidden" value={nextId}/>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input {...register('description')} id="description" type="text" className="form-control"/>
        {errors.description && <p className="text-danger">{errors.description.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="amount" className="form-label">Amount</label>
        <input {...register('amount', {valueAsNumber: true})} id="amount" type="number" className="form-control"/>
        {errors.amount && <p className="text-danger">{errors.amount.message}</p>}
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select {...register('category')} id="category" name="category" className="form-select">
          <option key="" value="">Select a category...</option>
          {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        {errors.category && <p className="text-danger">{errors.category.message}</p>}
      </div>

      <input disabled={!isValid} type="submit" className="btn btn-primary" value="Submit"/>
    </form>
  );
};

export default ExpenseForm;