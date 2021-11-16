let assert = require('assert');
let Fruit_basket = require('./../fruit-basket');
const pg = require('pg');
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL || 'postgresql://localhost:5432/my_fruit_basket';

const pool = new Pool({
  connectionString,
});

describe('The fruit basket exercise', function () {
  beforeEach(async function () {
    // clean the tables before each test run
    const fruits = Fruit_basket(pool);
    //await fruits.deleteFruits();
  });
  it('should be able to find all the fruit baskets for a given fruit type,', async function () {
    const fruits = Fruit_basket(pool);
    await fruits.createNewFruit('Orange', 2, 25);
    await fruits.createNewFruit('Grapes', 3, 35);
    await fruits.createNewFruit('Banana', 5, 28);

    var results = await fruits.getAllFruits('Orange');
    //console.log(results);
    assert.deepEqual(
      [
        {
          fruit_quantity: 2,
          fruit_type: 'Orange',
          unit_price: 25,
        },
      ],
      results
    );
  });

  it('should be able to update number of fruits for a given basket', async function () {
    const fruits = Fruit_basket(pool);
    // await fruits.createNewFruit('Grapes', 3, 35);
    let fruit = await fruits.getAllFruits('Grapes');

    await fruits.updateNumOfFruits(fruit[0].fruit_quantity + 1, 'Grapes');
    assert.deepEqual(
      [
        {
          fruit_quantity: 15,
          fruit_type: 'Grapes',
          unit_price: 35,
        },
      ],
      await fruits.getAllFruits('Grapes')
    );
  });

  it('should be able to show the total price for a given fruit basket', async function () {
    const fruits = Fruit_basket(pool);
    await fruits.getAllFruits('Banana');
    assert.deepEqual(
      [
        {
          unit_price: 28,
        },
      ],
      await fruits.totalPriceOfBasket('Banana')
    );
  });

  it('should be able to show the sum of the total of the fruit baskets for a given fruit type', async function () {
    const fruits = Fruit_basket(pool);
    await fruits.getAllFruits('Banana');
    assert.deepEqual(
      [
        {
          sum: 28,
        },
      ],
      await fruits.sumOfFruitBaskets('Banana')
    );
  });
});
