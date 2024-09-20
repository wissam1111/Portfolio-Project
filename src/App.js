
import React, { useEffect, useState } from 'react';
import Header from './Components/Header';
import Footer from './Components/Footer';
import ProfileCard from './Components/ProfileCard'
import axios from 'axios'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Contact from './Components/Contact';
import About from './Components/About';
import PageNotFound from './Components/PageNotFound';
import Blog from './Components/Blog';
import Home from './Components/Home';
import AddPost from './Components/AddPost';
import Weather from './Components/Weather';

export default function App(){
  const [posts, setPosts] = useState([]);
 const [comment,setComments] = useState([]);


useEffect(() => {
  async function fetchPosts() {
    try {
      const response = await axios.get('http://localhost:5000/posts');
      setPosts(response.data); // Set posts from the response
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  }

    async function fetchComments() {
      try{
      const response = await axios.get('http://localhost:5000/comments');
      setComments(response.data);
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
      <Weather/>


      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<Blog posts ={posts}/>}/>
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