import React from 'react';

export default function BlogPost({ title, content }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 mb-6 transform transition hover:scale-105 hover:shadow-xl duration-300 ease-in-out">
      <h2 className="text-3xl font-semibold text-gray-800 mb-3 sm:text-2xl md:text-3xl lg:text-4xl">
        {title}
      </h2>
      <p className="text-gray-600 leading-relaxed sm:text-sm md:text-base lg:text-lg">
        {content}
      </p>
      
    </div>
  );
}
