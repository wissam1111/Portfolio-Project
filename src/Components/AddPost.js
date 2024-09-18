// src/components/AddBlogPostForm.js
import React, { useState } from 'react';

export default function AddPostForm({ onAdd }){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <h2 className="text-xl font-semibold">Add New Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="block w-full mt-2 p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Summary"
        className="block w-full mt-2 p-2 border border-gray-300 rounded"
        required
      />
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
      >
        Add Post
      </button>
    </form>
  );
};

