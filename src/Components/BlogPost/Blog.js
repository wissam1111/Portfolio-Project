// Blog.js
import React, { useEffect, useState } from 'react';
import BlogPostPreview from '../BlogPost/BlogPostPreview';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import Search from '../Search/Search';
import { createComment, fetchComments, fetchPosts } from '../../Api/ApiCalls';
import { setPosts } from '../../Reducer/Reducer';
import Spinner from '../Spinner/Spinner';
import { fetchTotalPostsCount } from '../../Api/ApiCalls';

const Blog = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const [comments, setComments] = useState({});
  const [newComments, setNewComments] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [totalPosts, setTotalPosts] = useState(0); // State to hold total posts count

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = parseInt(searchParams.get('page')) || 1;
  const postsPerPage = parseInt(searchParams.get('limit')) || 3; // Default limit to 3
  const titleSearchTerm = searchParams.get('title') || '';
  const contentSearchTerm = searchParams.get('content') || '';

  useEffect(() => {
    const loadPostsAndComments = async () => {
      setLoading(true);
      try {
        // Fetch posts with pagination and search parameters
        const postResponse = await fetchPosts(currentPage, postsPerPage, titleSearchTerm, contentSearchTerm);
        const totalResponse = await fetchTotalPostsCount();
        setTotalPosts(totalResponse);
        if (!postResponse.data||postResponse.data.length===0) {
          setError('No posts found.');
          return;
        }
        const {data,totalPosts} = postResponse;

          const sortedPosts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
          dispatch(setPosts(sortedPosts)); // Set posts in Redux state
          setTotalPosts(totalPosts); // Update total posts count

        // Fetch comments
        const commentResponse = await fetchComments();
        if (commentResponse.error) {
          setError(commentResponse.error);
          return;
        }

        // Group comments by postId
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
  }, [dispatch, currentPage, postsPerPage, titleSearchTerm, contentSearchTerm]);



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
  const handleSearch = (title, content) => {
    const searchParams = {};
    
    if (title) {
      searchParams.title = title; // Add title if it's not empty
    }
    
    if (content) {
      searchParams.content = content; // Add content if it's not empty
    }

    // Reset to first page on search
    searchParams.page = 1; 
    searchParams.limit = postsPerPage;

    setSearchParams(searchParams);
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
          {/* Check if there are any posts */}
          {posts.length > 0 ? (
            // Slice posts for current page
            posts.slice((currentPage - 1) * postsPerPage, currentPage * postsPerPage).map((post) => (
              <div key={post.id} className="bg-white p-6 rounded-lg shadow-lg mt-11">
                <BlogPostPreview
                  id={post.id}
                  title={post.title}
                  content={post.content}
                  likes={post.likes}
                  date={post.date}
                  onLike={updateLikes} // Pass updateLikes function to BlogPostPreview
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
            // Message when no posts match search criteria
            <p className="text-red-600 text-center mt-2 font-bold col-span-3">No posts found matching your search criteria.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Blog;
