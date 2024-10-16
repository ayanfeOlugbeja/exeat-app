import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; // Assuming you are using Firebase authentication
import { auth } from './../../firebaseConfig'; // Your Firebase config
import logo from './../../Images/logo.png';

const Navbar = () => {
  let navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Track user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // User is signed in
      } else {
        setIsLoggedIn(false); // No user is signed in
      }
    });

    // Cleanup the listener on unmount
    return () => unsubscribe();
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className='w-full h-[10vh] bg-gray-900 text-white flex items-center shadow-lg'>
      <div className='container mx-auto px-6 md:px-12 flex justify-between items-center'>
        {/* Logo Section */}
        <div className='flex items-center'>
          <img
            src={logo}
            alt='School Logo'
            className='w-[50px] h-[50px] rounded-full mr-4'
            style={{ border: '2px solid #FFD700' }}
          />
          <h1 className='text-2xl font-bold tracking-wider'>GVU</h1>
        </div>

        {/* Nav Buttons for Desktop */}
        <div className='hidden md:flex items-center space-x-6'>
          {!isLoggedIn ? (
            <>
              <button
                className='bg-transparent border-2 border-yellow-400 text-yellow-400 py-2 px-6 rounded-full hover:bg-yellow-500 hover:text-black transition duration-300'
                onClick={() => navigate('/login')}>
                Sign In
              </button>
              <button
                className='bg-yellow-400 text-black py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300'
                onClick={() => navigate('/signup')}>
                Sign Up
              </button>
            </>
          ) : (
            <button
              className='bg-yellow-400 text-black py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300'
              onClick={() => navigate('/passi')}>
              Home
            </button>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className='md:hidden'>
          <button
            className='text-yellow-400 font-semibold'
            onClick={toggleMenu}>
            {isMenuOpen ? 'Close' : 'Menu'}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className='absolute top-[10vh] left-0 w-full bg-gray-800 text-white flex flex-col items-center space-y-4 py-4 md:hidden'>
          {!isLoggedIn ? (
            <>
              <button
                className='bg-transparent border-2 border-yellow-400 text-yellow-400 py-2 px-6 rounded-full hover:bg-yellow-500 hover:text-black transition duration-300'
                onClick={() => {
                  navigate('/login');
                  setIsMenuOpen(false); // Close menu after navigation
                }}>
                Sign In
              </button>
              <button
                className='bg-yellow-400 text-black py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300'
                onClick={() => {
                  navigate('/signup');
                  setIsMenuOpen(false); // Close menu after navigation
                }}>
                Sign Up
              </button>
            </>
          ) : (
            <button
              className='bg-yellow-400 text-black py-2 px-6 rounded-full hover:bg-yellow-500 transition duration-300'
              onClick={() => {
                navigate('/profile');
                setIsMenuOpen(false); // Close menu after navigation
              }}>
              Profile
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
