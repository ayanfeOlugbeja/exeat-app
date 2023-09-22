import HeroSection from './HeroSection';
import Navbar from './Navbar';
const Home = () => {
  return (
    <div
      className='homePage w-full h-[100vh]'
      style={{
        background: '#000000',
        color: '#ffffff',
      }}>
      <Navbar />
      <HeroSection />
    </div>
  );
};

export default Home;
