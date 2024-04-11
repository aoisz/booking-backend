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
    const query = 'SELECT * FROM Test_Table'; // Your SQL query here
    const result = await executeQuery(query);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST request example
app.post('/api/new_record', async (req, res) => {
  try {
    const { data } = req.body; // Assuming data is sent in the request body
    const query = `INSERT INTO Test_Table (column1, column2, column3) VALUES ('${data.value1}', '${data.value2}', '${data.value3}')`; // Adjust this query based on your table structure
    await executeQuery(query);
    res.status(201).json({ message: 'Record added successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT request example
app.put('/api/update_record/:id', async (req, res) => {
  try {
    const { id } = req.params; // Assuming the ID is passed as a URL parameter
    const { data } = req.body; // Assuming data is sent in the request body
    const query = `UPDATE Test_Table SET column1 = '${data.value1}', column2 = '${data.value2}', column3 = '${data.value3}' WHERE id = ${id}`; // Adjust this query based on your table structure
    await executeQuery(query);
    res.json({ message: 'Record updated successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE request example
app.delete('/api/delete_record/:id', async (req, res) => {
  try {
    const { id } = req.params; // Assuming the ID is passed as a URL parameter
    const query = `DELETE FROM Test_Table WHERE id = ${id}`; // Adjust this query based on your table structure
    await executeQuery(query);
    res.json({ message: 'Record deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
