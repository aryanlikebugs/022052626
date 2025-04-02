const API_BASE_URL = 'http://localhost:3000/api';

export const fetchTopUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/users/top`);
  return response.json();
};

export const fetchTrendingPosts = async () => {
  const response = await fetch(`${API_BASE_URL}/posts/trending`);
  return response.json();
};

export const fetchFeed = async () => {
  const response = await fetch(`${API_BASE_URL}/posts/feed`);
  return response.json();
};