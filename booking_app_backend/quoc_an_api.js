// quoc_an_api.js
const express = require('express');
const router = express.Router();

// POST request example
router.post('/new_record', async (req, res) => {
  // Your POST request code here
});

// PUT request example
router.put('/update_record/:id', async (req, res) => {
  // Your PUT request code here
});

// DELETE request example
router.delete('/delete_record/:id', async (req, res) => {
  // Your DELETE request code here
});

module.exports = router;
