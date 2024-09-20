import React, { useEffect, useState } from 'react';
import BlogPostPreview from './BlogPostPreview';
import axios from 'axios';
import Search from './Search';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  const updateLikes = async (postId, updatedLikes) => {
    try {
      await axios.put(`http://localhost:5000/posts/${postId}`, {
        likes: updatedLikes
      });
      setPosts(posts.map(post => post.id === postId ? { ...post, likes: updatedLikes } : post));
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const filteredPosts = posts.filter(post => (
    (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  return (
    <div className="container mx-auto px-4 py-6">
      <Search onSearch={handleSearch} />
      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <BlogPostPreview 
            key={post.id} 
            id={post.id}
            title={post.title} 
            content={post.content} 
            likes={post.likes}
            onLike={updateLikes} // Pass the updateLikes function to the BlogPostPreview
          />
        ))}
      </div>
    </div> 
  );
};

export default Blog;
