const express = require('express');
const { Database } = require('arangojs');
const cors = require('cors'); // Import the cors middleware

const app = express();
const PORT = 3000;

const HOST = 'https://6f6252c6bf06.arangodb.cloud:8529';
const USER = 'root';
const PASSWORD = 'rgstYbiSiWvlPbaakTYS';
const DB_NAME = 'semanticweb';

const arangoDBConnection = new Database({
  url: HOST,
  databaseName: DB_NAME,
  auth: { username: USER, password: PASSWORD },
});

// Use cors middleware to enable cross-origin requests
app.use(cors());

app.get('/seedata/:collectionName', async (req, res) => {
  try {
    const { collectionName } = req.params;
    const aqlQuery = `FOR doc IN ${collectionName} RETURN doc`;
    const cursor = await arangoDBConnection.query(aqlQuery);
    const result = await cursor.all();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

