let assert = require('assert');
let Fruit_basket = require('./../fruit-basket');
const pg = require('pg');
const Pool = pg.Pool;

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://siwe:fruitdb@localhost:5432/my_fruit_basket';

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

    var results = await fruits.getAFruit();
    //console.log(results);
    assert.deepEqual(
      [
        {
          fruit_quantity: 2,
          fruit_type: 'Orange',
          id: 29,
          unit_price: 25,
        },
        {
          fruit_quantity: 3,
          fruit_type: 'Grapes',
          id: 30,
          unit_price: 35,
        },
        {
          fruit_quantity: 5,
          fruit_type: 'Banana',
          id: 31,
          unit_price: 28,
        },
      ],
      results
    );
  });
});
