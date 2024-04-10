// index.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const sql = require('mssql');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuration for your SQL Server connection
const config = {
  user: 'sa',
  password: '123',
  server: 'ASUS/SQLEXPRESS02',
  database: 'booking_app_v1',
  options: {
    encrypt: false,
    trustServerCertificate: true
  }
};

// Function to execute SQL queries
async function executeQuery(query) {
  try {
    let pool = await sql.connect(config);
    let result = await pool.request().query(query);
    return result.recordset;
  } catch (err) {
    console.error('SQL Error:', err);
    throw err;
  }
}

// Example route to fetch data from the database
app.get('/api/test_table', async (req, res) => {
  try {
    const query = 'SELECT * FROM test_table'; // Your SQL query here
    const result = await executeQuery(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
