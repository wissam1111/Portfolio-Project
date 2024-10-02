// src/Components/Common/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Context/ThemeContext'; // Correct path for ThemeContext

const Header = () => {
    const { isDarkMode, toggleTheme, theme } = useTheme();

    return (
        <header className={`p-5 flex flex-col md:flex-row items-center justify-between`} style={{ backgroundColor: theme.background, color: theme.color }}>
            <div className="text-4xl p-2 text-center mb-2">
                <h1>My Portfolio</h1>
            </div>
                <nav>
                    <ul className="flex flex-col md:flex-row items-center gap-5 md:gap-10 text-lg">
                    <li><Link to="/" className={`hover:text-blue-800`}>Home</Link></li>
                    <li><Link to="/about" className={`hover:text-blue-800`}>About</Link></li>
                    <li><Link to="/blog" className={`hover:text-blue-800`}>Blog</Link></li>
                    <li><Link to="/contact" className={`hover:text-blue-800`}>Contact</Link></li>
                    <li><Link to="/add-post" className={`hover:text-blue-800`}>Add Post</Link></li>
                    <li><Link to="/project-cards" className={`hover:text-blue-800`}>Project Cards</Link></li>
                    </ul>
                </nav>
            <button 
                onClick={toggleTheme} 
                className={`ml-1 p-2 rounded mt-2`} style={{ backgroundColor: isDarkMode ? 'white' : 'gray', color: isDarkMode ? 'black' : 'white' }}>
                Theme
            </button>
        </header>
    );
};

export default Header;
