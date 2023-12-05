export type Account = 'money' | 'coin';

export type Price = {
  [key in Account]?: number;
};

export interface Item {
  name: string;
  label: string;
  category: string;
  categoryOptions: string[];
  description: string;
  price: Price;
  stock: number;
  image?: string;
}
