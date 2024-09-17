import React from 'react';
import { BrowserRouter as Router,Link,Route ,Routes } from 'react-router-dom';
const Header = () => {
  return (
    <Router>
    <header className="text-blue-500 bg-white flex items-center space-x-96 p-5 pl-36">
      
        <div className="text-4xl p-2">
          <h1>My portfolio</h1>
          </div>
          <nav>
            <ul className="flex gap-10 text-l mx-15"> 
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
                <Link to="/blog">Blog</Link>
                <Link to="/contact">Contact</Link>
            </ul>
          </nav>
      
    </header>
    </Router>
  );
};

export default Header;
