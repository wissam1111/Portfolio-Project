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
  const postsPerPage = parseInt(searchParams.get('limit')) || 3; // Default limit to 3
  const searchTerm = searchParams.get('search') || '';

  useEffect(() => {
    const loadPostsAndComments = async () => {
      setLoading(true);
      try {
        // Fetch posts with pagination and search parameters
        const postResponse = await fetchPosts(currentPage, postsPerPage,searchTerm);
        if (postResponse.status !== 200) {
          setError('Failed to fetch posts.');
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
        setComments(groupedComments);
      } catch (error) {
        setError('An unexpected error occurred. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
  
    loadPostsAndComments();
  }, [dispatch, currentPage, postsPerPage, searchTerm]);
  
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

  const totalPages = Math.ceil(posts.length / postsPerPage); // Calculate total pages based on fetched posts


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
          {posts.length > 0 ? (
            posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg mt-11">
                <BlogPostPreview
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  date={post.date}
                />
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