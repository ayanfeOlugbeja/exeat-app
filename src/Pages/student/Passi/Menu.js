import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const navLinks = [
    { id: 1, text: 'Home', path: '/passi' },
    { id: 2, text: 'Profile', path: '/passi/profile' },
    { id: 3, text: 'Create', path: '/passi/create' },
    { id: 4, text: 'Access Logs', path: '/passi/logs' },
    { id: 5, text: 'Print approval', path: '/passi/print' },
  ];

  return (
    <nav>
      <div className=''>
        <div>
          <button
            onClick={toggleMenu}
            className='text-white hover:text-gray-400 focus:outline-none focus:text-gray-400 w-12 h-12'>
            <svg
              className='w-10 h-10 fill-black'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'>
              {isOpen ? (
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3 5H21V7H3V5ZM3 12H21V14H3V12ZM3 19H21V21H3V19Z'
                />
              ) : (
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M4 6H20V8H4V6ZM4 11H20V13H4V11ZM4 16H20V18H4V16Z'
                />
              )}
            </svg>
          </button>
          {isOpen && (
            <div
              className='absolute top-[12vh] w-[260px] h-[70vh] '
              style={{ border: '2px solid black', borderTop: 'none' }}>
              <ul className={`${isOpen ? 'block' : 'hidden'}`}>
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link
                      to={link.path}
                      onClick={toggleMenu} // Close the menu when a link is clicked
                      className='flex flex-row justify-between items-start space-y-4 px-4 mt-6 font-semibold'>
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Menu;
