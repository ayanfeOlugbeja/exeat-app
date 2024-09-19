// Home.jsx
import HeroSection from './HeroSection';
import Navbar from './Navbar';

const Home = () => {
  return (
    <div className='homePage bg-gray-900 text-white'>
      <Navbar />
      <HeroSection />

      {/* Features Section */}
      <section className='featuresSection py-24 px-6 md:px-20 bg-gray-800'>
        <h2 className='text-4xl md:text-6xl font-semibold text-center text-yellow-400'>
          Why Choose PASSI?
        </h2>
        <p className='text-center text-gray-300 mt-4 max-w-xl mx-auto leading-relaxed'>
          Discover the features that make PASSI the perfect solution for our
          school's exeat management.
        </p>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mt-16'>
          <div className='p-8 border border-gray-700 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg'>
            <h3 className='text-2xl font-bold text-yellow-400'>
              Fast Processing
            </h3>
            <p className='mt-4 text-gray-300'>
              Automated exeat approval in minutes, saving students and staff
              valuable time.
            </p>
          </div>
          <div className='p-8 border border-gray-700 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg'>
            <h3 className='text-2xl font-bold text-yellow-400'>
              User-Friendly
            </h3>
            <p className='mt-4 text-gray-300'>
              Designed with simplicity in mind, PASSI ensures easy navigation
              for all users.
            </p>
          </div>
          <div className='p-8 border border-gray-700 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg'>
            <h3 className='text-2xl font-bold text-yellow-400'>
              Secure & Reliable
            </h3>
            <p className='mt-4 text-gray-300'>
              Keeping your data safe with modern security protocols, ensuring
              peace of mind.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className='testimonialsSection py-24 px-6 md:px-20 bg-gray-900'>
        <h2 className='text-4xl md:text-6xl font-semibold text-center text-yellow-400'>
          What Students Say
        </h2>
        <div className='grid grid-cols-1 md:grid-cols-3 gap-12 mt-16'>
          <div className='p-8 border border-gray-700 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg'>
            <p className='text-gray-300 italic'>
              "PASSI makes applying for exeats so easy and fast. I no longer
              have to wait for days!"
            </p>
            <h4 className='mt-4 text-yellow-400 font-bold'>— Student A</h4>
          </div>
          <div className='p-8 border border-gray-700 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg'>
            <p className='text-gray-300 italic'>
              "With PASSI, managing exeat requests is now smooth and
              stress-free."
            </p>
            <h4 className='mt-4 text-yellow-400 font-bold'>— Admin B</h4>
          </div>
          <div className='p-8 border border-gray-700 rounded-lg text-center transition-transform transform hover:scale-105 hover:shadow-lg'>
            <p className='text-gray-300 italic'>
              "Submitting my exeat only takes a minute, and I can track its
              approval status!"
            </p>
            <h4 className='mt-4 text-yellow-400 font-bold'>— Student C</h4>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className='ctaSection py-24 px-6 md:px-20 bg-gray-800 text-center'>
        <h2 className='text-4xl md:text-6xl font-semibold text-yellow-400'>
          Ready to Use PASSI?
        </h2>
        <p className='text-gray-300 mt-4 max-w-2xl mx-auto leading-relaxed'>
          Join the students and administrators already benefiting from PASSI’s
          easy-to-use exeat system.
        </p>
        <div className='mt-10'>
          <button
            className='bg-yellow-400 text-black font-semibold py-4 px-10 rounded-full shadow-lg hover:bg-yellow-500 transition-all duration-500 ease-in-out transform hover:scale-105'
            onClick={() => (window.location.href = '/signup')}>
            Sign Up Now ↗
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
