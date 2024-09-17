import React from 'react';

function BlogPostPreview(props) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-11">
      
      <h2 className="text-2xl text-center font-semibold mb-2">{props.title}</h2>
      <p className="text-gray-700 mb-4 max-w-96">{props.content}</p>
      
    </div>
  );
}

export default BlogPostPreview;
