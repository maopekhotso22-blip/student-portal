import express from 'express';
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

// Connect directly to your existing "marks" database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',     // Put your MySQL password here if you have one
  database: 'marks' // Connects straight to your marks database
});

// Test the connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
    return;
  }
  console.log('Successfully connected to the MySQL "marks" database!');
});

// API Endpoint: Receives data from your HTML form and saves it to MySQL
app.post('/api/marks', (req, res) => {
  const { name, marks } = req.body;

  if (!name || marks === undefined) {
    return res.status(400).json({ error: 'Name and marks are required' });
  }

  const query = `INSERT INTO marks (name, marks) VALUES (?, ?)`;
  db.query(query, [name, marks], (err, result) => {
    if (err) {
      console.error('Database insert error:', err.message);
      return res.status(500).json({ error: err.message });
    }
    res.json({ message: 'Saved successfully', id: result.insertId });
  });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:5173`);
});