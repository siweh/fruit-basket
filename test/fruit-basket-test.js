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
    await pool.query(`delete from fruit_basket`);
  });
  it('should be able to find all the fruit baskets for a given fruit type,', async function () {
    const fruits = Fruit_basket(pool);
    await fruits.createNewFruit('Orange', 2, 4);
    await fruits.createNewFruit('Grapes', 3, 5);
    await fruits.createNewFruit('Banana', 5, 3);

    var results = await fruits.getFruit('Orange');
    //console.log(results);
    assert.deepEqual(
      [
        {
          fruit_quantity: 2,
          fruit_type: 'Orange',
          unit_price: 4,
        },
      ],
      results
    );
  });

  it('should be able to update number of fruits for a given basket', async function () {
    const fruits = Fruit_basket(pool);
    await fruits.createNewFruit('Grapes', 3, 5);
    //await fruits.getFruit('Grapes');

    await fruits.updateNumOfFruits(3, 'Grapes');
    assert.deepEqual(
      [
        {
          fruit_quantity: 6,
          fruit_type: 'Grapes',
          unit_price: 5,
        },
      ],
      await fruits.getFruit('Grapes')
    );
  });

  it('should be able to show the total price for a given fruit basket', async function () {
    const fruits = Fruit_basket(pool);
    await fruits.createNewFruit('Banana', 5, 3);

    assert.deepEqual(
      [
        {
          fruit_total: 15,
        },
      ],
      await fruits.totalPriceOfBasket('Banana')
    );
  });

  it('should be able to show the sum of the total of the fruit baskets for a given fruit type', async function () {
    const fruits = Fruit_basket(pool);
    await fruits.createNewFruit('Banana', 5, 3);
    let sumOfFruits = await fruits.getFruit('Banana');
    //console.log(sumOfFruits);
    assert.deepEqual(5, sumOfFruits[0].fruit_quantity);
  });
});
