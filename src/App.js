// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import ProfileCard from './Components/Common/ProfileCard';
import AddPostForm from './Components/AddPost/AddPostForm';
import Contact from './Components/Contact/Contact';
import About from './Components/About/About';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Blog from './Components/BlogPost/Blog';
import Home from './Components/Home/Home';
import { createPost } from './Api/ApiCalls';
import { ThemeProvider } from './Context/ThemeContext'; // Correct path for ThemeContext

export default function App() {
  const [posts, setPosts] = useState([]);

  const handleAddPost = async (newPost) => {
    try {
      const response = await createPost(newPost);
      setPosts([...posts, response.data]);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <ThemeProvider>
      <Router>
        <Header />
        <ProfileCard />

        <main className="p-4">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog' element={<Blog posts={posts} />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path='/add-post' element={<AddPostForm onAdd={handleAddPost} />} />
          </Routes>
        </main>
        
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
