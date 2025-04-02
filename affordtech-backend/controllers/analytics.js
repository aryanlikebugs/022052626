const { getTopUsers, fetchPostsForUsers } = require('../services/data');

// Controller function for fetching top users
async function getTopUsersHandler(req, res) {
    try {
        const users = await getTopUsers();
        if (users.error) {
            return res.status(500).json(users); // Send error response
        }
        res.json(users); // Send successful response
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}

// Controller function for fetching posts for users
async function getUserPostsHandler(req, res) {
    try {
        const posts = await fetchPostsForUsers();
        if (posts.error) {
            return res.status(500).json(posts); // Send error response
        }
        res.json(posts); // Send successful response
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}

module.exports = { getTopUsersHandler, getUserPostsHandler }; // Export the functions
