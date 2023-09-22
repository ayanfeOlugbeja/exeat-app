import { Link, useLocation } from 'react-router-dom';
import logo from './../../../Images/logo.png';
import Menu from './Menu';

const Navbar = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isLoginpage = location.pathname === '/login';
  const isRegisterpage = location.pathname === '/register';
  if (isHomepage || isLoginpage || isRegisterpage) {
    return null;
  }

  return (
    <div>
      <div
        className='navBar  w-[100%] h-[14vh] p-2'
        style={{ border: '2px solid black' }}>
        <div className='flex flex-row justify-around items-center'>
          <Menu />
          <div className='navElements  w-[80%] h-[100%] flex flex-row justify-between mx-auto items-center '>
            <div className='w-[13%] flex flex-row items-center justify-around'>
              <img
                src={logo}
                alt='logo'
                className='w-[55px] h-[55px] rounded-2xl'
                style={{ border: '2px solid black' }}
              />
              <Link to='/' className='font-semibold tracking-widest text-lg'>
                GVU{' '}
              </Link>
            </div>

            <div
              className='imagePlaceholder w-[5%] h-[65%]'
              style={{ border: '1px solid grey', borderRadius: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
