import React from 'react';
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa';

export default function Footer(){
  return (
    <footer className="bg-black text-white p-4 mt-8">

      <div className="container text-center">

        <div className="mb-4 flex max-w-52 mx-auto gap-16">
          <a href="https://github.com/wissam1111" className="text-white" target="_blank" rel="noopener noreferrer">
            <FaGithub size="24" />
          </a>
          <a href="https://www.linkedin.com/in/Wissam jamous" className="mx-2 text-white" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size="24" />
          </a>
          <a href="https://instagram.com/wissam.jamous" target="_blank" rel="noopener noreferrer">
            <FaInstagram size="24" />
          </a>
        </div>


        <p className="mb-4">
          Email: <a href="mailto:your.email@example.com" className="text-blue-400">wissamjamous48@gmail.com</a>
        </p>



        <p className="text-sm">
         CopyRight &copy; {new Date().getFullYear()} Wissam jamous. All Rights Reserved.
        </p>


        <p>
          <a href="#top" className="text-blue-400">Back to top</a>
        </p>
      </div>
    </footer>
  );
};


