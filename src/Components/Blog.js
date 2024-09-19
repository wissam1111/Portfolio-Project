import React from 'react';
import BlogPostPreview from '../Components/BlogPostPreview';
import Search from '../Components/Search';
import { useState } from 'react';


const Blog = ({ posts, onLike }) => {
  const [filteredPosts, setFilteredPosts] = useState(posts);
  const handleSearch = (query) => {
    const lowercasedQuery = query.toLowerCase();
    const result = posts.filter(post =>
      post.title.toLowerCase().includes(lowercasedQuery) ||
      post.content.toLowerCase().includes(lowercasedQuery)
    );
    setFilteredPosts(result);
    
  };


  return (
    
    <div className=''>
      <h1 className='font-semibold mb-5 text-3xl text-blue-800 text-center'>Blog Page</h1>
      <Search onSearch={handleSearch} />
      {filteredPosts.length > 0 ? (
        filteredPosts.map(post => (
          <BlogPostPreview
            key={post.id}
            title={post.title}
            content={post.content}
            onLike={() => onLike(post.id)}
          />
        ))
      ) : (
        <p className='text-red-600 font-semibold'>No blog posts found.</p>
      )}

    </div>
  );
};

export default Blog;
