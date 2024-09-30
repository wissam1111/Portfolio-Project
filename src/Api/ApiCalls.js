import axios from "axios";
const weatherApi = 'b5e30b360a02321e8c98d81543f062c0';
const BASE_URL = 'http://localhost:5000'

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


export const updatedPost = (id,updatedPost)=>axios.put(`${BASE_URL}/posts/${id}`,updatedPost);
export const  fetchComments = ()=>axios.get(`${BASE_URL}/comments`);
export const createPost = (newPost)=>axios.post(`${BASE_URL}/posts`,newPost);
export const createComment = (newComment)=>axios.post(`${BASE_URL}/comments`, newComment);
export const fetchWeather = (city)=>axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`)