
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

  useEffect(()=>{
    const fetchPosts = async ()=>{
      try{
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
      }catch(error){
        console.error('Error fetching posts',error);
      }
    } 
    const fetchComments = async()=>{
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

  const handleLike = (id) => {
    setPosts(posts.map(post => post.id === id ? { ...post, liked: !post.liked } : post));
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
      <Header />
      <ProfileCard/>
      <main className="p-4">
        <AddPostForm onAdd={handleAddPost} />
        {posts.map(post => (
          <BlogPostPreview
            key={post.id}
            title={post.title}
            content={post.content}
            onLike={() => handleLike(post.id)}/>
        ))}
        <div>
          <h2 className='text-lg font-bold mb-2'>Comments:</h2>
          {comments.map((comment)=>{
            <CommentPreview key={comment.id} comment={comment.text}/>
            {}
          })}
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