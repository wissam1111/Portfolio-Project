import React from 'react';
import { useForm } from 'react-hook-form';

const Contact = () => {
  const {register,handleSubmit,reset,formState:{errors}}=useForm();

  const onSubmit = ()=>{
    reset();
  }


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white shadow-lg rounded-lg mt-10 mb-10">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              {...register('name',{required:'Name is required'})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Your Name"
            />
            {errors.name && <p className='text-red-600'>{errors.name.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              {...register('email',{required:'Email is required'})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="you@example.com"
            />
            {errors.email && <p className='text-red-600'>{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
            {...register('textarea',{required:'Information is required'})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              rows="5"
              placeholder="Write your message..."
            />
            {errors.textarea && <p className='text-red-600'>{errors.textarea.message}</p>}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );

}
export default Contact;
