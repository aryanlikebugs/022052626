const axios = require('axios');

async function getAuthToken() {
    const url = 'http://20.244.56.144/evaluation-service/auth';
    const payload = {
        email: "22052626@kiit.ac.in",
        name: "aryan gupta",
        rollNo: "022052626",
        accessCode: "nwpwrZ",
        clientID: "91761562-c185-4355-b7aa-80e70f8fc3a0",
        clientSecret: "RfqAsGPbNrRVDgcw"
    };

    try {
        const response = await axios.post(url, payload);
        return response.data.access_token;
    } catch (error) {
        console.error('Error fetching token:', error.response ? error.response.data : error.message);
        return null;
    }
}

async function getTopUsers() {
  const url = "http://20.244.56.144/evaluation-service/users";

  const token = await getAuthToken();
  if (!token) {
      return { error: "Authentication failed. No token received." };
  }

  try {
      const headers = {
          Authorization: `Bearer ${token}`
      };

      const response = await axios.get(url, { headers });

      if (response.status === 200 && response.data && response.data.users) {
          const usersArray = Object.entries(response.data.users) // Convert object to array of key-value pairs
              .map(([posts, name]) => ({ name, no_of_post: parseInt(posts) })) // Map to desired format
              .sort((a, b) => b.no_of_post - a.no_of_post) // Sort in descending order by no_of_post
              .slice(0, 5); // Get top 5 users

          return usersArray;
      } else {
          return { error: "Unexpected response structure", data: response.data };
      }
  } catch (error) {
      return { error: "Error fetching users", message: error.response ? error.response.data : error.message };
  }
}

async function fetchPostsForUsers() {
    const token = await getAuthToken();
    if (!token) {
        console.error("Failed to retrieve authentication token.");
        return { error: "Authentication failed. No token received." };
    }

    const baseUrl = "http://20.244.56.144/evaluation-service/users";
    const headers = { Authorization: `Bearer ${token}` };

    let usersPosts = [];

    for (let userId = 1; userId <= 20; userId++) {
        try {
            const response = await axios.get(`${baseUrl}/${userId}/posts`, { headers });

            if (response.status === 200 && response.data.posts) {
                const postIds = response.data.posts.map(post => post.id);
                usersPosts.push({ userid: userId, postid: postIds }); // Replaced commentid with postid
            } else {
                usersPosts.push({ userid: userId, postid: [], error: "No posts found" });
            }
        } catch (error) {
            console.error(`Error fetching posts for user ${userId}:`, error.message);
            usersPosts.push({ userid: userId, postid: [], error: "Failed to fetch posts" });
        }
    }

    return usersPosts; // Ensure to return the result
}






// Export both functions
module.exports = { getAuthToken, getTopUsers,fetchPostsForUsers };
