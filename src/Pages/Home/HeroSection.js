import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  let navigate = useNavigate();
  return (
    <div className='HeroSection w-full md:w-[60%] h-full md:h-[60%] mx-auto my-20'>
      <div className='p-4'>
        <h1 className='text-4xl md:text-9xl tracking-wider'>PASSI</h1>
        <div className='about flex flex-col justify-between items-start h-full md:h-[45%] w-full md:w-[70%] space-y-6 p-2 mt-6'>
          <p className='text-xl md:text-3xl'>
            PASSI is an Electronic Exeat System that lets you make Exeat
            application simpler, easier and faster.
          </p>
          <div className='accessibility flex flex-row justify-start items-center gap-3 w-full md:w-[300px]'>
            <button
              className='transparent rounded w-[100px] h-[40px]'
              style={{ border: '2px solid white' }}
              onClick={() => navigate('/login')}>
              <span>Try PASSI ↗</span>
            </button>
            <button
              className='transparent  w-[130px] h-[40px]'
              style={{ borderBottom: '2px solid white' }}>
              View on gitHub ↗
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
