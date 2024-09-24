import React, { useState } from 'react';

export default function AddPostForm({ onAdd }){
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, content,likes:0 });
    setTitle('');
    setContent('');
  };

  return (
  <div>
    <h2 className="text-3xl font-semibold text-center mb-8 mt-5">Add New Post</h2>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="block w-full mt-2 p-2 border border-gray-300 rounded text-black"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="block w-full mt-2 p-2 border border-gray-300 rounded text-black"
        required/>
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded flex justify-start">
        Add Post
      </button>
    </form>
    </div>
  );
};

