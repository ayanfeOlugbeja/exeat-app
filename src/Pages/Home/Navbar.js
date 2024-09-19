// Navbar.jsx
import { useNavigate } from 'react-router-dom';
import logo from './../../Images/logo.png';

const Navbar = () => {
  let navigate = useNavigate();

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

        {/* Nav Buttons */}
        <div className='hidden md:flex items-center space-x-6'>
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
        </div>

        {/* Mobile Menu */}
        <div className='md:hidden'>
          <button className='text-yellow-400 font-semibold'>Menu</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
