const express = require('express');
const { getTopUsersHandler, getUserPostsHandler } = require('../controllers/analytics'); 

const router = express.Router();

// API Endpoints
router.get('/users', getTopUsersHandler); // Correct function
router.get('/posts', getUserPostsHandler); // Correct function

module.exports = router;
