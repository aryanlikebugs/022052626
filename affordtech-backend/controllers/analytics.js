const { getTopUsers, fetchPostsForUsers,fetchCommentsCountForUsers } = require('../services/data');

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


async function getUserPostsCommentsHandler(req, res) {
    try {
        const commentsData = await fetchCommentsCountForUsers();
        if (commentsData.error) {
            return res.status(500).json(commentsData); // Send error response
        }
        res.json(commentsData); // Send successful response
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}
async function getTopPostHandler(req, res) {
    try {
        const { type } = req.query;
        
        // Ensure type is "popular"
        if (type !== "popular") {
            return res.status(400).json({ error: "Invalid type parameter. Use type=popular." });
        }

        const commentsData = await fetchCommentsCountForUsers();
        if (commentsData.error) {
            return res.status(500).json(commentsData); // Send error response
        }

        let allPosts = [];
        
        // Collect all posts
        commentsData.forEach(user => {
            allPosts.push(...user.posts);
        });

        if (allPosts.length === 0) {
            return res.json({ message: "No posts available" });
        }

        // Sort posts by comment count in descending order
        allPosts.sort((a, b) => b.comment_count - a.comment_count);

        // Get the top 5 posts
        const maxTop5Posts = allPosts.slice(0, 5);

        res.json({
            message: "Top 5 posts with the highest number of comments",
            top_5_posts: maxTop5Posts
        });

    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", message: error.message });
    }
}


module.exports = { getTopUsersHandler, getUserPostsHandler, getUserPostsCommentsHandler, getTopPostHandler };

