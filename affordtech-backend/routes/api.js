const express = require('express');
const { getTopUsersHandler, getUserPostsHandler,getUserPostsCommentsHandler,getTopPostHandler } = require('../controllers/analytics'); 

const router = express.Router();

// API Endpoints
router.get('/users', getTopUsersHandler); // Correct function
router.get('/posts', getUserPostsHandler); // Correct function
router.get('/comment',getUserPostsCommentsHandler);
router.get('/top-post', getTopPostHandler);

module.exports = router;
