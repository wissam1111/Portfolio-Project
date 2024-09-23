import React, { useEffect, useState } from 'react';
import BlogPostPreview from './BlogPostPreview';
import axios from 'axios';
import Search from './Search';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({}); // Object to store comments for each post

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/posts');
        setPosts(response.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/comments');
        const groupedComments = response.data.reduce((acc, comment) => {
          (acc[comment.postId] = acc[comment.postId] || []).push(comment);
          return acc;
        }, {});
        setComments(groupedComments);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchPosts();
    fetchComments();
  }, []);

  const updateLikes = async (postId, updatedLikes) => {
    try {
      const postToUpdate = posts.find(post => post.id === postId);
      if (postToUpdate) {
        const updatedPost = { ...postToUpdate, likes: updatedLikes };
        await axios.put(`http://localhost:5000/posts/${postId}`, updatedPost);
        setPosts(posts.map(post => post.id === postId ? updatedPost : post));
      }
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  const handleSearch = (query) => {
    setSearchTerm(query);
  };

  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault();
    const commentText = newComments[postId] || ''; // Get the comment for the specific post
    if (!commentText) return;

    const commentData = {
      postId,
      text: commentText,
    };
    try {
      const response = await axios.post('http://localhost:5000/comments', commentData);
      setComments(prevComments => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), response.data],
      }));
      setNewComments(prev => ({ ...prev, [postId]: '' })); // Clear the comment input for the specific post
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const handleCommentChange = (postId, value) => {
    setNewComments(prev => ({ ...prev, [postId]: value })); // Update the specific post's comment input to ensure each comment specifi for each post
  };

  const filteredPosts = posts.filter(post => (
    (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  return (
    <div className="container mx-auto px-4 py-6">
      <Search onSearch={handleSearch} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg mt-11">
              <BlogPostPreview 
                id={post.id}
                title={post.title} 
                content={post.content} 
                likes={post.likes}
                onLike={updateLikes} 
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold">Comments</h3>
                <ul className="list-disc pl-5">
                  {(comments[post.id] || []).map(comment => (
                    <li key={comment.id} className="text-gray-600">{comment.text}</li>
                  ))}
                </ul>
                <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="mt-2 flex">
                  <input
                    type="text"
                    value={newComments[post.id] || ''}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    placeholder="Add a comment"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full"
                  />
                  <button type="submit" className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2">Submit</button>
                </form>
              </div>
            </div>
          ))
        ) : (
          <p className='text-red-600 text-center mt-2 font-bold col-span-3'>No posts found matching your search criteria.</p>
        )}
      </div>
    </div> 
  );
};

export default Blog;
