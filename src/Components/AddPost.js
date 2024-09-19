import React from 'react';
import AddPostForm from './AddPostForm';

const AddPost = ({ onAdd }) => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Add New Blog Post</h1>
      <AddPostForm onAdd={onAdd}/>
    </div>
  );
};

export default AddPost;
