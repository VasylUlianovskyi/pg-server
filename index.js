const { Pool } = require('pg');

//TODO: move to comfig.js / process.evv

const connectionOptions = {
  user: 'postgres',
  password: 'admin',
  host: 'localhost',
  port: '5432',
  database: 'phones_sales',
};

const pool = new Pool(connectionOptions);

process.on('beforeExit', () => pool.end());

// promises then/catch
pool
  .query('SELECT CURRENT_DATE')
  .then(result => console.log('then', result.rows[0]))
  .catch(err => console.log(err));

// callback

pool.query('SELECT CURRENT_DATE', (err, result) => {
  if (err) {
    return console.log(err);
  }
  console.log('callback', result.rows[0]);
});

// promises async/await // anonimselfrun function
(async function () {
  try {
    const result = await pool.query('SELECT CURRENT_DATE');
    console.log('await', result.rows[0]);
  } catch (err) {
    console.log(err);
  }
})();
