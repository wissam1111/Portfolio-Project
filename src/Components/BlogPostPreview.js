import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BlogPostPreview({ id, title, content, likes, comments, onLike }) {
  const [currentLikes, setCurrentLikes] = useState(likes || 0); // Initialize likes with props

  useEffect(() => {
    // Fetch the current likes when the component mounts
    const fetchLikes = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/posts/${id}`);
        setCurrentLikes(response.data.likes);
      } catch (error) {
        console.error("Error fetching likes:", error);
      }
    };
    fetchLikes();
  }, [id]);

  const handleLike = async () => {
    const updatedLikes = currentLikes + 1;

    try {
      await axios.put(`http://localhost:5000/posts/${id}`, {
        likes: updatedLikes, // Update the likes count
      });
      setCurrentLikes(updatedLikes); // Update the state with new likes
      onLike(id, updatedLikes); // Call the onLike function passed from Blog
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-11 flex flex-col items-center justify-center mx-5 md:mx-0">
      <div className="flex flex-col items-center justify-center mb-6 w-full">
        <h2 className="text-2xl text-center font-semibold mb-2 w-full md:w-72">{title}</h2>
      </div>
      <p className="text-gray-700 mb-4 text-center max-w-full md:max-w-96">{content}</p>
      <button
        onClick={handleLike}
        className="flex items-center justify-center mt-2 text-blue-500"
      >
        <i className="fa-solid fa-thumbs-up" style={{ fontSize: "26px" }}></i>
        <span className="text-lg ml-1">{currentLikes}</span>
      </button>
    </div>
  );
}

export default BlogPostPreview;
