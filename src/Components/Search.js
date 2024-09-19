import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <div className='flex justify-center items-center'>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search blog posts"
        className="border p-2 mb-2"
      />
      
      <button type="submit" className="p-2 bg-blue-500 text-white mb-2 rounded-md" >Search</button>
    </div>
    </form>
  );
};

export default Search;
