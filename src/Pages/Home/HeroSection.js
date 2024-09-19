// HeroSection.jsx
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  let navigate = useNavigate();

  return (
    <div className='HeroSection bg-gray-900 text-white min-h-screen flex items-center justify-center'>
      <div className='container mx-auto text-center px-6 md:px-12 space-y-8'>
        <h1 className='text-5xl md:text-7xl font-extrabold leading-tight tracking-wider'>
          Welcome to <span className='text-yellow-400'>PASSI</span>
        </h1>
        <p className='mt-4 text-lg md:text-2xl leading-relaxed text-gray-300'>
          The streamlined, fast, and secure way to manage exeat applications for
          students at GVU.
        </p>
        <div className='flex flex-col md:flex-row gap-6 justify-center mt-8'>
          <button
            className='bg-yellow-400 text-black font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-yellow-500 transition duration-300 transform hover:scale-105'
            onClick={() => navigate('/login')}>
            Try PASSI ↗
          </button>
          <button
            className='bg-transparent border-2 border-yellow-400 text-yellow-400 font-semibold py-3 px-8 rounded-full hover:bg-yellow-500 hover:text-black transition duration-300 transform hover:scale-105'
            onClick={() => window.open('https://github.com', '_blank')}>
            View on GitHub ↗
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
