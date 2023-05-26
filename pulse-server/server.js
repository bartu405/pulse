const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json()); // Use built-in body parser

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pulse-db',
  password: 'root',
  port: 5432, // PostgreSQL's default port
});

app.post('/posts', async (req, res) => {
  const { rating, text, user_id, private: isPrivate} = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO posts (rating, text, user_id, private) VALUES ($1, $2, $3, $4) RETURNING *`, 
      [rating, text, user_id, isPrivate]
    );

    res.json(result.rows[0]); // send the inserted post back to the client
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.get('/', (req, res) => {
  res.send('Hello from Pulse server!');
});

const port = 5000; 
app.listen(port, () => {
  console.log(`Pulse server listening at http://localhost:${port}`);
});
