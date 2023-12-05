import { faker } from '@faker-js/faker';
import { History, Item, Price } from '../types';

export const generateItems = (count: number): Item[] => {
  const items: Item[] = [];
  for (let i = 0; i < count; i++) {
    const category = faker.helpers.arrayElement([
      'weapon',
      'vehicle',
      'clothes',
      'item',
    ]);
    const categoryOptions: string[] = [];
    switch (category) {
      case 'weapon':
        categoryOptions.push(faker.helpers.arrayElement(['gun', 'melee']));
        break;
      case 'vehicle':
        categoryOptions.push(faker.helpers.arrayElement(['xekg', 'limited']));
        break;
      case 'clothes':
        categoryOptions.push(
          faker.helpers.arrayElement([
            'mask',
            'hair',
            'arms',
            'leg',
            'bag',
            'shoes',
            'accessory',
            'undershirt',
            'top',
            'hat',
            'glass',
            'ear',
            'watch',
            'bracelet',
          ])
        );
        categoryOptions.push(faker.helpers.arrayElement(['male', 'female']));
        break;
      case 'item':
        categoryOptions.push(
          faker.helpers.arrayElement(['food', 'drink', 'medicine'])
        );
        break;
      default:
        break;
    }
    const random = faker.number.int({ max: 3 });
    const price: Price = {
      coin: undefined,
      money: undefined,
    };
    if (random === 0) {
      price.coin = faker.number.int({ max: 2500 });
    } else if (random === 1) {
      price.money = faker.number.int({ max: 2500 });
    } else {
      price.coin = faker.number.int({ max: 2500 });
      price.money = faker.number.int({ max: 2500 });
    }
    items.push({
      name: faker.commerce.product(),
      category,
      categoryOptions: categoryOptions,
      description: faker.commerce.productDescription(),
      price,
      stock: faker.number.int({ max: 2500 }),
      image: faker.image.url(),
      label: faker.commerce.productName(),
    });
  }
  return items;
};

export const generateHistories = (count: number): History[] => {
  const histories: History[] = [];
  for (let i = 0; i < count; i++) {
    histories.push({
      date: Math.floor(faker.date.past().getTime() / 1000),
      item: generateItems(1)[0],
      quantity: faker.number.int({ min: 1, max: 5 }),
      total: faker.number.int({ max: 2500 }),
      paymentMethod: faker.helpers.arrayElement(['money', 'coin']),
    });
  }
  return histories;
};
