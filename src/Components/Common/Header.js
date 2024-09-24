import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="bg-white text-blue-500 p-5 flex flex-col md:flex-row items-center justify-around  ">
      <div className="text-4xl p-2 text-center">
        <h1>My Portfolio</h1>
      </div>
      <nav>
        <ul className="flex flex-col md:flex-row items-center gap-4 md:gap-10 text-lg">
          <li><Link to="/" className="hover:text-blue-700">Home</Link></li>
          <li><Link to="/about" className="hover:text-blue-700">About</Link></li>
          <li><Link to="/blog" className="hover:text-blue-700">Blog</Link></li>
          <li><Link to="/contact" className="hover:text-blue-700">Contact</Link></li>


        </ul>
      </nav>
    </header>
  );
};

export default Header;
