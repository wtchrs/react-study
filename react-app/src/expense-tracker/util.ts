export interface Expense {
  id: number;
  description: string;
  amount: number;
  category: string;
}

export const categories = ['Groceries', 'Utilities', 'Entertainment'] as const;
