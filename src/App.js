
import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProfileCard from './Components/ProfileCard'
import axios from 'axios'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Contact from './Components/Contact';
import About from './Components/About';
import PageNotFound from './Components/PageNotFound';
import IndividualBlogPost from './Components/IndividualBlog';
import Blog from './Components/Blog';
import Home from './Components/Home';
import AddPost from './Components/AddPost';

export default function App(){
  const [posts, setPosts] = useState([]);
  const [comments,setComments]= useState([]);
  const [weather ,setWeather] = useState(null);
  const [city, setCity] = useState('');
  const weatherApi = 'b5e30b360a02321e8c98d81543f062c0'
  
useEffect(()=>{
  const fetchWeather = async ()=>{
    try{
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApi}`);
    setWeather(response.data);
    }catch(error){
      console.error('Error fetching weather data',error);
    }
  }
  fetchWeather();
},[city])

  useEffect(()=>{
    async function fetchPosts() {
      try{
        const response = await fetch('http://localhost:5000/posts');
        const data= await response.json();
        setPosts(data);
      }catch(error){
        console.error('Error fetching posts',error);
      }
    } 

    async function fetchComments() {
      try{
      const response = await fetch('http://localhost:5000/comments');
      const data = await response.json();
      setComments(data);
    }catch(error){
      console.error('Error fetching comments',error);
    }
  }
 fetchPosts();
 fetchComments();
},[]);

  useEffect(()=>{
  const intervalId = setInterval(async()=>{
    try{
      const response = await axios.get('http://localhost:5000/comments');
      setComments(response.data);
    }catch(error){
      console.error('Error fetching comments',error);
    }
  },5000)

    return ()=>clearInterval(intervalId);
  },[]);

  const handleLike = async (id) => {
    const post = posts.find(post=>post.id === id);
    if(!post) return;
    const updatePost = {...post,liked:!post.liked};
    try{
      await axios.put(`http://localhost:5000/posts/${id}`,updatePost);
    setPosts(posts.map(post => post.id === id ?updatePost : post));
    }catch(error){
      console.error('Error updating likes',error)
    }
  };


  const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post('http://localhost:5000/posts', newPost);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
  return (
    <div>
     <Router>
      <Header />
      <ProfileCard/>
      
      <main className="p-4">
      <div className="mt-7 flex flex-col justify-center items-center mb-20 bg-blue-50 p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">Weather Information</h2>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border border-gray-300 rounded-lg px-4 py-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  
  {weather ? (
    <div className="text-center mt-4 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-700">Current Weather in {weather.name}:</h3>
      <p className="text-2xl font-bold text-gray-900 mt-2">{(weather.main.temp - 273.15).toFixed(1)}°C</p>
      <p className="text-gray-600 capitalize mt-1">Weather: {weather.weather[0].description}</p>
      <p className="text-gray-600 mt-1">Humidity: {weather.main.humidity}%</p>
      <p className="text-gray-600 mt-1">Wind Speed: {weather.wind.speed} m/s</p>
    </div>
  ) : (
    <p className="text-gray-500">Enter a city to get weather information.</p>
  )}
</div>


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<Blog posts ={posts} onLike={handleLike}/>}/>
        <Route path='/blog:id' element={<IndividualBlogPost posts = {posts}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/add-post' element={<AddPost onAdd={handleAddPost}/>}/>
      </Routes>        
        </main>
      <Footer />
      </Router>
    </div>
  );
}