import { History } from './history.type';

export interface User {
  id: string;
  name: string;
  money: number;
  coin: number;
  histories: History[];
}
