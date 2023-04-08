const postgres = require('postgres');
require('dotenv').config({ path: '../.env' });
// trying postgres.js instead of node-postgres(pg) first
// console.log('dotenv', process.env.PORT);

const sql = postgres('postgres://username:password@http:/host:port/database', {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
});

// async function getReviews() {
//   try {
//     const response = await sql`
//     select
//       id,
//       reviewer_name
//     from reviews,
//     limit 5
//     `;
//     return response;
//   } catch (err) {
//     console.log('Error', err);
//     return [];
//   }
// }

// getReviews()
//   .then((res) => {
//     console.log('Response', res);
//     sql.end();
//   });

exports.sql = sql;
