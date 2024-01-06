import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { CgProfile } from 'react-icons/cg';
import { IoMdPersonAdd } from 'react-icons/io';
import { GrContactInfo } from 'react-icons/gr';

import HomePopup from '../student/Passi/HomePopup';

function SideBar({ currentUser }) {
  let navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/profile', { state: { currentUser } });
  };
  return (
    <>
      <div
        className='icons absolute left-0 top-0 h-[100vh] w-[80px] flex flex-col items-center justify-evenly gap-10
         p-10'
        style={{ border: '2px solid black' }}>
        <GoHome className='w-8 h-8' />
        <CgProfile className='w-8 h-8' onClick={handleProfileClick} />
        <IoMdPersonAdd className='w-8 h-8' />
        <GrContactInfo className='w-8 h-8' />
        <HomePopup />
      </div>
    </>
  );
}
export default SideBar;
