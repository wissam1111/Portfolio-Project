import React, { useState} from 'react';
import { updatedPost } from '../../Api/ApiCalls';

function BlogPostPreview({ id, title, content, likes,date, onLike, showLikes = true }) { // Added showLikes prop
  const [currentLikes, setCurrentLikes] = useState(likes);
  const [isExpanded,setIsExpanded]=useState(false);


  const toggleExpand=()=>{
    setIsExpanded(prevState=>!prevState)
  }
  const handleLike = async () => {
    const updatedLikes = currentLikes + 1;

    try {
      await updatedPost(id,{likes:updatedLikes});
      setCurrentLikes(updatedLikes);
      onLike(id, updatedLikes);
    } catch (error) {
      console.error("Error updating likes:", error);
    }
  };
  const formattedDate = date ? new Date(date).toLocaleDateString() : "Date not available"; // Handle invalid date
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 mt-11 flex flex-col items-center justify-center mx-5 md:mx-0">
      <div className="flex flex-col items-center justify-center mb-6 w-full">
        <h2 className="text-gray-700 text-2xl text-center font-semibold mb-2 w-full md:w-72">{title}</h2>
      </div>
      <p className="text-gray-700 mb-4 text-center max-w-full md:max-w-96">{content}</p>
      <p className="text-gray-500 text-sm mb-4">{formattedDate}</p>
      <p className='text-gray-800'>{isExpanded ? content :`${content.substring(0,50)}...`}</p>
      <button onClick={toggleExpand} className='text-blue-500 mt-2'>{isExpanded ? 'READ Less':'READ More'}</button>
      {showLikes && (
        <button
          onClick={handleLike}
          className="flex items-center justify-center mt-2 text-blue-500"
        >
          <i className="fa-solid fa-thumbs-up" style={{ fontSize: "26px" }}></i>
          <span className="text-lg ml-1">{currentLikes}</span>
        </button>
      )}
    </div>
  );
}

export default BlogPostPreview;
