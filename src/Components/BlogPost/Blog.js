import React, { useEffect, useState } from 'react';
import BlogPostPreview from '../BlogPost/BlogPostPreview';
import {useDispatch,useSelector} from 'react-redux'
import Search from '../Search/Search';
import { createComment,fetchComments,fetchPosts,updatedPost } from '../../Api/ApiCalls';
import { setPosts} from '../../Reducer/Reducer';
import Spinner from '../Spinner/Spinner';

const Blog = () => {
  const dispatch = useDispatch();
  const posts=useSelector((state)=>state.posts);
  const [searchTerm, setSearchTerm] = useState('');
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({}); // Object to store comments for each post
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 3; 

  useEffect(() => {
    const loadPostsAndComments = async () => {
      setLoading(true); //before fetching
      try {
        const postResponse = await fetchPosts();
        if(postResponse.error){
          setError(postResponse.error);
          return;
        }
      
        const sortedPosts = postResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        dispatch(setPosts(sortedPosts)); // Update state with sorted posts
      
        const commentResponse = await fetchComments();
        if(commentResponse.error){
          setError(commentResponse.error);
          return;
        }
        const groupedComments = commentResponse.data.reduce((acc, comment) => {
          (acc[comment.postId] = acc[comment.postId] || []).push(comment);
          return acc;
        }, {});
        
      setComments(groupedComments);
    
      } catch (error) {
        setError('unexpected error occurred. Pleast try again later.');
      }finally{
        setLoading(false);//after fetching
      }
    };
    loadPostsAndComments();
 }, [dispatch]);



  const updateLikes = async (postId, updatedLikes) => {
    try {
      const postToUpdate = posts.find(post => post.id === postId);
      if (postToUpdate) {
        const updatedPostData = { ...postToUpdate, likes: updatedLikes };
        const response = await updatedPost(postId,updatedPostData);
        if(response.error){
          setError(response.error);
          return;
        }
       dispatch(updatedLikes(updatedPostData));
      }
    } catch (error) {
      setError('Failed to update likes. Please try again later.');
    }
 

};
  const handleSearch = (query) => {
    setSearchTerm(query);
  };



  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault();
    const commentText = newComments[postId] || ''; // Get the comment for the specific post
    if (!commentText) return;
    const newComment = {
      postId,
      text: commentText,
  };
    try {
      const response = await createComment(newComment);
      if(response.error){
        setError(response.error);
        return;
      }
      setComments(prevComments => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), response.data],
      }));
      setNewComments(prev => ({ ...prev, [postId]: '' })); // Clear the comment input for the specific post
    } catch (error) {
      console.error("Error adding comment:", error);
      setError('Failed to submit comment. Please try again later.')
    }
  };




  const handleCommentChange = (postId, value) => {
    setNewComments(prev => ({ ...prev, [postId]: value })); // Update the specific post's comment input to ensure each comment specifi for each post
  };




  const filteredPosts = posts.filter(post => (
    (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  return (
    <div className="container mx-auto px-4 py-6">
            {error && <p className="text-red-600 text-center mt-2 font-bold mb-6">{error}</p>}
      <Search onSearch={handleSearch} />
      {loading?(
        <Spinner/>
      ):(
     
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {currentPosts.length > 0 ? (
          currentPosts.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg mt-11">
              <BlogPostPreview 
                id={post.id}
                title={post.title} 
                content={post.content} 
                likes={post.likes}
                date={post.date}
                onLike={updateLikes}  
              />
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-gray-700">Comments</h3>
                <ul className="list-disc pl-5">
                  {(comments[post.id] || []).map(comment => (
                    <li key={comment.id} className="text-gray-600">{comment.text}</li>
                  ))}
                </ul>
                <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="mt-2 flex">
                  <input
                    type="text"
                    value={newComments[post.id] || ''}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    placeholder="Add a comment"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-full text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button type="submit" className="ml-2 bg-blue-500 text-white rounded-lg px-4 py-2">Submit</button>
                </form>
              </div>
            </div>
          ))
        ) : (
          <p className='text-red-600 text-center mt-2 font-bold col-span-3'>No posts found matching your search criteria.</p>
          
        )}
      </div>
      )}

<div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
          >
            {index + 1}
          </button>
        ))}
        </div>
    </div> 
  );
};

export default Blog;
