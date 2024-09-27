import React, { useEffect, useState } from 'react';
import BlogPostPreview from '../BlogPost/BlogPostPreview';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Search from '../Search/Search';
import { createComment, fetchComments, fetchPosts } from '../../Api/ApiCalls';
import { setPosts } from '../../Reducer/Reducer';
import Spinner from '../Spinner/Spinner';

const Blog = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  // Extract search parameters from URL
  const [searchParams, setSearchParams] = useSearchParams();

  // Extract the current page and limit from the query params or use defaults
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const postsPerPage = parseInt(searchParams.get('limit')) || 5; // Default limit to 5
  const searchTerm = searchParams.get('search') || '';

  // Fetch posts and comments when page, limit, or search term changes
  useEffect(() => {
    const loadPostsAndComments = async () => {
      setLoading(true); // Start loading
      try {
        // Fetch posts with pagination parameters from URL query params
        const postResponse = await fetchPosts(currentPage, postsPerPage);
        if (postResponse.error) {
          setError(postResponse.error);
          return;
        }

        const sortedPosts = postResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        dispatch(setPosts(sortedPosts)); // Set posts in Redux state

        // Fetch comments
        const commentResponse = await fetchComments();
        if (commentResponse.error) {
          setError(commentResponse.error);
          return;
        }
        const groupedComments = commentResponse.data.reduce((acc, comment) => {
          (acc[comment.postId] = acc[comment.postId] || []).push(comment);
          return acc;
        }, {});
        setComments(groupedComments); // Set comments for each post
      } catch (error) {
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false); // Stop loading
      }
    };
    loadPostsAndComments();
  }, [dispatch, currentPage, postsPerPage]); // Run effect when page or limit changes

  // Update likes for a post
  const updateLikes = async (postId, updatedLikes) => {
    try {
      const postToUpdate = posts.find((post) => post.id === postId);
      if (postToUpdate) {
        const updatedPostData = { ...postToUpdate, likes: updatedLikes };
        dispatch(setPosts(posts.map((post) => (post.id === postId ? updatedPostData : post))));
      }
    } catch (error) {
      setError('Failed to update likes. Please try again later.');
    }
  };

  // Handle search input
  const handleSearch = (query) => {
    setSearchParams({ page: 1, limit: postsPerPage, search: query }); // Reset to first page on search
  };


  // Submit a new comment
  const handleCommentSubmit = async (postId, e) => {
    e.preventDefault();
    const commentText = newComments[postId] || '';
    if (!commentText) return;
    const newComment = {
      postId,
      text: commentText,
    };
    try {
      const response = await createComment(newComment);
      if (response.error) {
        setError(response.error);
        return;
      }
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), response.data],
      }));
      setNewComments((prev) => ({ ...prev, [postId]: '' }));
    } catch (error) {
      setError('Failed to submit comment. Please try again later.');
    }
  };

  // Handle comment input change
  const handleCommentChange = (postId, value) => {
    setNewComments((prev) => ({ ...prev, [postId]: value }));
  };

  // Filter posts based on search term
  const filteredPosts = posts.filter((post) => (
    (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) || 
    (post.content && post.content.toLowerCase().includes(searchTerm.toLowerCase()))
  ));

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const displayedPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage, currentPage * postsPerPage
  );

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setSearchParams({ page: pageNumber, limit: postsPerPage, search: searchTerm });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Error message */}
      {error && <p className="text-red-600 text-center mt-2 font-bold mb-6">{error}</p>}
      
      {/* Search Component */}
      <Search onSearch={handleSearch} />
      

      {/* Loader */}
      {loading ? (
        <Spinner />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {/* If there are posts */}
          {displayedPosts.length > 0 ? (
            displayedPosts.map((post) => (
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
                    {(comments[post.id] || []).map((comment) => (
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
            <p className="text-red-600 text-center mt-2 font-bold col-span-3">No posts found matching your search criteria.</p>
          )}
        </div>
      )}

      {/* Pagination controls */}
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
