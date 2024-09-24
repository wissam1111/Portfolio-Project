
import React, { useEffect, useState } from 'react';
import Header from './Components/Common/Header.js';
import Footer from './Components/Common/Footer.js';
import ProfileCard from './Components/Common/ProfileCard.js'
import AddPostForm from './Components/AddPost/AddPostForm.js'
import { BrowserRouter as Router ,Routes,Route } from 'react-router-dom';
import Contact from './Components/Contact/Contact.js';
import About from './Components/About/About.js';
import PageNotFound from './Components/PageNotFound/PageNotFound.js';
import Blog from './Components/BlogPost/Blog.js';
import Home from './Components/Home/Home.js';
import AddPost from './Components/AddPost/AddPost.js';
import { createPost } from './Api/ApiCalls.js';
export default function App(){
  const [posts, setPosts] = useState([]);

  const handleAddPost = async (newPost) => {
    try {
      const response = await createPost(newPost)
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
      

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/blog' element={<Blog posts ={posts}/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='*' element={<PageNotFound/>}/>
        <Route path='/add-post' element={<AddPostForm onAdd={handleAddPost}/>}/>
      </Routes>        
        </main>
      <Footer />
      </Router>
    </div>
  );
}