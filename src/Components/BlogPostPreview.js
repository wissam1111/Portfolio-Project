import React from 'react';
import { useState } from 'react';

function BlogPostPreview(props) {

  const [likes, setLikes] = useState(0);

  function handleLike(){
    setLikes(likes + 1);
  }
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-11 flex flex-col items-center justify-center ml-5">

      <div className='flex items-center justify-center mb-6'>
      <h2 className="text-2xl text-center font-semibold mb-2 w-72">{props.title}</h2>
      </div>
      <p className="text-gray-700 mb-4 max-w-96">{props.content}</p>
      <button onClick={handleLike}><i className="fa-solid fa-thumbs-up" style={{fontSize:"26px",color:"#0000ff"}}></i> <span className='text-l ml-1'>{likes}</span></button>
      
    </div>
  );
}

export default BlogPostPreview;
