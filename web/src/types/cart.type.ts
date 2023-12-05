import { Item } from './item.type';

export interface CartItem {
  id: string;
  item: Item;
  quantity: number;
  paymentMethod: 'money' | 'coin';
}
