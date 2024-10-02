// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Common/Header';
import Footer from './Components/Common/Footer';
import ProfileCard from './Components/Common/ProfileCard.tsx';
import AddPostForm from './Components/AddPost/AddPostForm';
import Contact from './Components/Contact/Contact';
import About from './Components/About/About';
import PageNotFound from './Components/PageNotFound/PageNotFound';
import Blog from './Components/BlogPost/Blog';
import Home from './Components/Home/Home';
import { createPost } from './Api/ApiCalls';
import { ThemeProvider } from './Context/ThemeContext'; // Correct path for ThemeContext
import { useDispatch,useSelector } from 'react-redux';
import { addPost } from './Reducer/Reducer';

import ExampleCards from './Components/Common/ProjectCards.tsx';
export default function App() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts); // Access posts from the Redux store

  const handleAddPost = async (newPost) => {
    try {
      const response = await createPost(newPost);
      dispatch(addPost(response.data)); // Dispatch the addPost action
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };
const projects = [
  {
    title:'Project 1',
    description:'A information about Project 1',
    image:'https://picsum.photos/400/200'
  },
  {
    title:'Project 2',
    description:'A information about Project 2',
    image:'https://picsum.photos/400/200'
  },
  {
    title:'Project 2',
    description:'A information about Project 3',
    image:'https://picsum.photos/400/200'
  },
  {
    title:'Project 4',
    description:'A information about Project 4',
    image:'https://picsum.photos/400/200'
  },
  {
    title:'Project 5',
    description:'A information about Project 5',
    image:'https://picsum.photos/400/200'
  },
  {
    title:'Project 6',
    description:'A information about Project 6',
    image:'https://picsum.photos/400/200'    
  },
  {
    title:'Project 7',
    description:'A information about Project 7',
    image:'https://picsum.photos/400/200'
  },
  {
    title:'Project 8',
    description:'A information about Project 8',
    image:'https://picsum.photos/400/200'
  }
]
  return (
    <ThemeProvider>
      <Router>
        <Header />
        <ProfileCard 
        name='Wissam Jamous'
        description='A Junior Frond End Developper'
        facebookUrl="https://www.facebook.com/wissam.jamous.1?mibextid=ZbWKwL"
        instagramUrl="https://www.instagram.com/wissam.jamous"
        githubUrl="https://www.github.com/wissam1111"
        imgUrl={require('./Assets/31AWFCkio3L._AC_UF1000,1000_QL80_.jpg')}
        
        
      
        />

        <main className="p-4">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/blog' element={<Blog posts={posts} />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path='/add-post' element={<AddPostForm onAdd={handleAddPost} />} />
            <Route path='/project-cards' element={<ExampleCards projects={projects}/>}/>
          </Routes>
        </main>
        
        <Footer />
      </Router>
    </ThemeProvider>
  );
}
