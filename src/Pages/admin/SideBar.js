import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHome } from 'react-icons/go';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { IoMdPersonAdd } from 'react-icons/io';
import { GrContactInfo } from 'react-icons/gr';

import HomePopup from '../student/Passi/HomePopup';

function SideBar({ currentUser }) {
  let navigate = useNavigate();
  const handleDocumentClick = () => {
    navigate('/admin/docs', { state: { currentUser } });
  };
  const handleHomeClick = () => {
    navigate('/admin', { state: { currentUser } });
  };
  const handleStudentClick = () => {
    navigate('/admin/students', { state: { currentUser } });
  };

  return (
    <>
      <div
        className='icons fixed left-0 top-0 h-[100vh] w-[80px] flex flex-col items-center justify-evenly gap-10
         p-10'
        style={{ border: '2px solid black' }}>
        <GoHome className='w-8 h-8' onClick={handleHomeClick} />
        <HiOutlineDocumentText
          className='w-8 h-8'
          onClick={handleDocumentClick}
        />
        <IoMdPersonAdd className='w-8 h-8' />
        <GrContactInfo className='w-8 h-8' onClick={handleStudentClick} />
        <HomePopup />
      </div>
    </>
  );
}
export default SideBar;
