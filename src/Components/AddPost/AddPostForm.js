import React from 'react';
import { useForm } from 'react-hook-form';

export default function AddPostForm({ onAdd }){
  const {register,handleSubmit,reset,formState:{errors}}=useForm();

  const onSubmit = (data)=>{
    const date = new Date().toISOString();
    onAdd({...data ,likes:0, date});
    reset();
  };

  return (
  <div>
    <h2 className="text-3xl font-semibold text-center mb-8 mt-5">Add New Post</h2>
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-4 mb-4">
      <input
        type="text"
        placeholder="Title"
        {...register('title',{required:'Title is required'})}
        className="block w-full mt-2 p-2 border border-gray-300 rounded text-black"
      />
      {errors.title&&<p className='text-red-600'>{errors.title.message}</p>}
      <textarea
        placeholder="Content"
        {...register('content',{required:'Content is required'})}
        className="block w-full mt-2 p-2 border border-gray-300 rounded text-black"
        />
        {errors.content && <p className='text-red-600'>{errors.content.message}</p>}
      <button
        type="submit"
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded flex justify-start">
        Add Post
      </button>
    </form>
    </div>
  );
};

