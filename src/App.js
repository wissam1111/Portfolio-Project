
import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import BlogPostPreview from './Components/BlogPostPreview';
import AddPostForm from './Components/AddPost';
import ProfileCard from './Components/ProfileCard'
import axios from 'axios'
import CommentPreview from './Components/CommentPreview';

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

  const handleLike = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, liked: !post.liked } : post));
  };

  const handleAddPost = async (newPost) => {
    try {
      const response = await axios.post('http://localhost:5000/posts',newPost);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <div>
      <Header />
      <ProfileCard/>
      
      <main className="p-4">

        <AddPostForm onAdd={handleAddPost} />

        {/* Rendering fetched posts */}
        <h2 className="text-lg font-bold mb-2">Blog Posts:</h2>
        {posts.length > 0 ? (
          posts.map(post => (
            <BlogPostPreview
              key={post.id}
              title={post.title}
              content={post.content}
              onLike={() => handleLike(post.id)}/>
          ))
        ) : (
          <p>No blog posts found.</p>
        )}
         {/* Rendering fetched comments */}
        <h2 className="text-lg font-bold mb-2 mt-4">Comments:</h2>
        {comments.length > 0 ? (
          comments.map(comment => (
            <CommentPreview 
              key={comment.id} 
              comment={comment.text} // fixed the prop name
            />
          ))
        ) : (
          <p>No comments found.</p>
        )}
          <div className="mt-7 flex flex-col justify-center items-center">
          <h2 className="text-lg font-bold mb-2">Weather:</h2>
          <input
            type="text"
            value={city}
            onChange={(e)=>setCity(e.target.value)}
            placeholder="Enter city name"
            className="border p-2 mb-2"
          />
          {weather && (
            <div>
              <h3 className="text-lg font-bold">Current Weather in {weather.name}:</h3>
              <p>Temperature: {weather.main.temp}°C</p>
              <p>Weather: {weather.weather[0].description}</p>
            </div>
          )}
        </div>

        <h1 className='text-center text-4xl font-semibold text-blue-800 mt-10 '>Recent Blog</h1>

        <div className='flex m-3'>
        <BlogPostPreview title="How to Get Started with React: A Beginner’s Guide" content="Cover the basics of setting up a React project, creating components, and managing state. Include code examples and best practices for newcomers."/>
      
      <BlogPostPreview title="Exploring Tailwind CSS: A Comprehensive Tutorial" content="Provide an in-depth look at Tailwind CSS, including how to install it, its utility-first approach, and examples of building responsive designs."/>

      <BlogPostPreview title="The Importance of Responsive Design in Modern Web Development" content="Discuss why responsive design is crucial, techniques for creating responsive layouts, and tools for testing responsiveness."/>
          </div>
        </main>
      <Footer />
    </div>
  );
}