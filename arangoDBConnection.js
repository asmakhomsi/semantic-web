const { Database } = require('arangojs');

const HOST = 'https://6f6252c6bf06.arangodb.cloud:8529';
const PORT = 8529;
const USER = 'root';
const PASSWORD = 'rgstYbiSiWvlPbaakTYS';
const DB_NAME = 'semanticweb';

const db = new Database({
  url: HOST,
  databaseName: DB_NAME,
  auth: { username: USER, password: PASSWORD },
});

// Try to connect to the ArangoDB server
db
  .query('RETURN 1')
  .then(() => {
    console.log('Connected to ArangoDB successfully!');
  })
  .catch((err) => {
    console.error('Failed to connect to ArangoDB:', err);
  });


