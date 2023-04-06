const postgres = require('postgres');
// trying postgres.js instead of node-postgres(pg) first

const sql = postgres('postgres://username:password@http:/localhost:3001/database', {
  host: 'localhost',
  port: '5432',
  database: 'koiapi',
  username: 'me',
  password: 'password',
});

async function getReviews() {
  try {
    const response = await sql`
    select
      id,
      reviewer_name
    from reviews
    limit 10
    `;
    return response;
  } catch (err) {
    console.log('Error', err);
    return [];
  }
}

getReviews()
  .then((res) => {
    console.log('Response', res);
    sql.end();
  });

console.log('hello world');
