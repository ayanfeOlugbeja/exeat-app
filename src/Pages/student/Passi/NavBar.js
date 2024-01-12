import { Link, useLocation } from 'react-router-dom';
import React, { useState } from 'react';
import logo from './../../../Images/logo.png';
import Menu from './Menu';
import ProfilePopup from './profile/ProfilePopup';
import { BsFillPersonFill } from 'react-icons/bs';

export const Navbar = ({ currentUser }) => {
  const [popupVisible, setPopupVisible] = useState(false);
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const isLoginpage = location.pathname === '/login';
  const isRegisterpage = location.pathname === '/register';
  const isRecoverpage = location.pathname === '/recover';
  const isVerifypage = location.pathname === '/verify';
  const isAdminpage = location.pathname === '/admin';
  const isProfilepage = location.pathname === '/profile';
  const isDepartmentpage = location.pathname === '/department';
  const isAdmindocs = location.pathname === '/admin/docs';
  const isAdminstudents = location.pathname === '/admin/students';
  if (
    isHomepage ||
    isLoginpage ||
    isRegisterpage ||
    isRecoverpage ||
    isVerifypage ||
    isAdminpage ||
    isProfilepage ||
    isDepartmentpage ||
    isAdmindocs ||
    isAdminstudents
  ) {
    return null;
  }
  const displayPopup = () => {
    setPopupVisible(!popupVisible);
  };

  return (
    <div>
      {popupVisible ? (
        <div className='popup-position'>
          <ProfilePopup currentUser={currentUser} />
        </div>
      ) : (
        <></>
      )}
      <div
        className='navBar  w-[100%] h-[12vh] p-2'
        style={{ border: '2px solid black' }}>
        <div className='flex flex-row justify-around items-center ml-10 '>
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
            <div className='welcome-message'>
              {currentUser ? (
                <p>Welcome, {currentUser.displayName || currentUser.name}</p>
              ) : (
                <p>Welcome</p>
              )}
            </div>

            {/* <div
              className='imagePlaceholder w-[5%] h-[70%] rounded-full'
              style={{ border: '2px solid black' }}
              onClick={displayPopup}>
              <BsFillPersonFill size={40} className='mx-auto' />
            </div> */}
            <img
              className='user-logo w-[60px] h-[60px] rounded-full'
              style={{ border: '2px solid black' }}
              src={currentUser?.imageLink}
              alt='user'
              onClick={displayPopup}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
