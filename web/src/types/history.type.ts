import { Item } from './item.type';

export interface History {
  date: number;
  item: Item;
  quantity: number;
  total: number;
  paymentMethod: 'money' | 'coin';
}
