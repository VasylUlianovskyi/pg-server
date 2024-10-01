const { Pool } = require('pg');
const User = require('./user');

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

const db = {};
db.pool = pool;
db.User = User;
User.pool = pool;

module.exports = db;

// promises then/catch
// pool
//   .query('SELECT CURRENT_DATE')
//   .then(result => console.log('then', result.rows[0]))
//   .catch(err => console.log(err));

// // callback

// pool.query('SELECT CURRENT_DATE', (err, result) => {
//   if (err) {
//     return console.log(err);
//   }
//   console.log('callback', result.rows[0]);
// });

// // promises async/await // anonimselfrun function
// (async function () {
//   try {
//     const result = await pool.query('SELECT CURRENT_DATE');
//     console.log('await', result.rows[0]);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// знайти користувача  з id 1

// (async function () {
//   try {
//     const id = 1;
//     const result = await pool.query(`
//       SELECT *
//       FROM users
//       WHERE id = ${id}
//       `);
//     console.log(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// // sql injection

// (async function () {
//   try {
//     const id = 1;
//     const result = await pool.query(
//       `
//       SELECT *
//       FROM users
//       WHERE id = $1;
//       `,
//       [id]
//     );
//     console.log('$1', result.rows[0]);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// page = 2, results = 5, os = 'Android', minRAM = 6, isDualSim = true
// (async function () {
//   try {
//     const page = 2,
//       results = 5,
//       os = 'Android',
//       minRAM = 6,
//       isDualSim = true;

//     const limit = results;
//     const offset = results * (page - 1);

//     const result = await pool.query(
//       `
//       SELECT *
//       FROM phones
//       WHERE os = $1 AND ram >=$2 AND is_dual_sim = $3
//       ORDER BY id
//       LIMIT $4 OFFSET $5;
//       `,
//       [os, minRAM, isDualSim, limit, offset]
//     );
//     console.log(result.rows);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// user, email test2@mail

// (async function () {
//   try {
//     const email = 'test2@mail';
//     const result = await pool.query(
//       `
//       SELECT *
//       FROM users
//       WHERE email = $1
//       `,
//       [email]
//     );
//     console.log(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// змінити користувача з id 3: новий імейл test2@gmail.com

// (async function () {
//   try {
//     const newEmail = 'test2@gmail.com';
//     const id = 3;

//     const result = await pool.query(
//       `
//       UPDATE users
//       SET email = $1
//       WHERE id = $2
//       RETURNING *;
//       `,
//       [newEmail, id]
//     );
//     console.log(result.rows[0]);
//   } catch (err) {
//     console.log(err);
//   }
// })();
