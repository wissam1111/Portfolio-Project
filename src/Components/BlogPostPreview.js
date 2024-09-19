import React, { useState } from 'react';

function BlogPostPreview(props) {
  const [likes, setLikes] = useState(0);

  function handleLike() {
    setLikes(likes + 1);
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-11 flex flex-col items-center justify-center mx-5 md:mx-0">
      <div className="flex flex-col items-center justify-center mb-6 w-full">
        <h2 className="text-2xl text-center font-semibold mb-2 w-full md:w-72">{props.title}</h2>
      </div>
      <p className="text-gray-700 mb-4 text-center max-w-full md:max-w-96">{props.content}</p>
      <button
        onClick={handleLike}
        className="flex items-center justify-center mt-2 text-blue-500"
      >
        <i className="fa-solid fa-thumbs-up" style={{ fontSize: "26px" }}></i>
        <span className="text-lg ml-1">{likes}</span>
      </button>
    </div>
  );
}

export default BlogPostPreview;
