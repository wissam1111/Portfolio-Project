import axios from "axios";
const weatherApi = 'b5e30b360a02321e8c98d81543f062c0';
const BASE_URL = 'http://localhost:5000'

// In your ApiCalls.js or wherever you're defining your API calls
export const fetchPosts = (page, limit, title, content) => {
  const query = new URLSearchParams();
  query.set('page', page);
  query.set('limit', limit);
  
  if (title) {
    query.set('title', title); // Only include if it exists
  }

  if (content) {
    query.set('content', content); // Only include if it exists
  }

  return axios.get(`${BASE_URL}/posts?${query.toString()}`);
};

// Fetch the total count of posts for pagination
export const fetchTotalPostsCount = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data.length; // Return total posts count
  } catch (error) {
    console.error('Error fetching total posts count:', error);
    throw new Error('Failed to fetch total posts count');
  }
};

export const createPost = async (newPost) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, newPost);

    // After adding the new post, increment totalPosts in db.json
    const totalResponse = await axios.get(`${BASE_URL}/totalPosts`);
    const newTotalCount = totalResponse.data.totalPosts + 1;

    await axios.patch(`${BASE_URL}/totalPosts`, { totalPosts: newTotalCount });

    return response.data;
  } catch (error) {
    throw new Error('Failed to create post');
  }
};

export const updatedPost = (id,updatedPost)=>axios.put(`${BASE_URL}/posts/${id}`,updatedPost);
export const  fetchComments = ()=>axios.get(`${BASE_URL}/comments`);
export const createComment = (newComment)=>axios.post(`${BASE_URL}/comments`, newComment);
export const fetchWeather = (city)=>axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`)