module.exports = function Fruit_basket(pool) {
  async function createNewFruit(type, quantity, price) {
    try {
      let fruit = await pool.query(
        `select * from fruit_basket where fruit_type = $1`,
        [type]
      );
      if (fruit.rows.length === 0) {
        await pool.query(
          `insert into fruit_basket(fruit_type, fruit_quantity, unit_price) values($1, $2, $3)`,
          [type, quantity, price]
        );
        console.log('Data saved successful');
      }
      //console.log(fruit.rows);
    } catch (error) {
      console.log(error);
    }
  }

  async function getAFruit() {
    let results = await pool.query(`select * from fruit_basket`);
    //console.log(results.rows);
    return results.rows;
  }

  async function deleteFruits() {
    try {
      await pool.query(`DELETE FROM fruit_basket WHERE fruit_basket.id >= 1`);
      console.log('Data deleted successful');
    } catch (error) {
      console.log(error);
    }
  }

  return {
    createNewFruit,
    getAFruit,
    deleteFruits,
  };
};
