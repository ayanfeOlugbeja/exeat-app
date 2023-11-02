import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidPaint } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import HomePopup from './HomePopup';
export default function HomeComponent({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false);
  let navigate = useNavigate();
  const handleCreateApplicationClick = () => {
    navigate('/passi/create', { state: { currentUser } });
  };
  const handleAccessApplicationClick = () => {
    navigate('/passi/logs', { state: { currentUser } });
  };
  const handleProfileClick = () => {
    navigate('/passi/profile', { state: { currentUser } });
  };

  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='welcome-title h-[60px] flex items-center justify-end p-3'>
        <h2 className='text-2xl font-bold mr-28'>
          PASSI - Student's Dashboard
        </h2>
      </div>
      <div className='relative cards w-[45%] h-[84%] mx-auto flex flex-row flex-wrap gap-10 p-4 items-center justify-center'>
        <div
          className='w-[40%] h-[46%] flex flex-col flex-nowrap items-center justify-center p-2 gap-8'
          onClick={handleCreateApplicationClick}
          style={{ border: '2px solid black' }}>
          <BiSolidPaint className='w-[90px] h-[70px]' />
          <p className='font-bold'>Create Application</p>
        </div>
        <div
          className='w-[40%] h-[46%] flex flex-col flex-nowrap items-center justify-center p-2 gap-8'
          onClick={handleProfileClick}
          style={{ border: '2px solid black' }}>
          <BsFillPersonFill className='w-[90px] h-[70px]' />
          <p className='font-bold'>Profile</p>
        </div>
        <div
          className='w-[40%] h-[46%] flex flex-col flex-nowrap items-center justify-center p-2 gap-8'
          onClick={handleAccessApplicationClick}
          style={{ border: '2px solid black' }}>
          <HiOutlineDocumentText className='w-[90px] h-[70px]' />
          <p className='font-bold'>Access Logs</p>
        </div>
        <div
          className='w-[40%] h-[46%] flex flex-col flex-nowrap items-center justify-center p-2 gap-8'
          onClick={() => setModalOpen(true)}
          style={{ border: '2px solid black' }}>
          <BiLogOut className='w-[90px] h-[70px]' />
          <p className='font-bold'>Logout</p>
          {modalOpen && <HomePopup onClose={() => setModalOpen(false)} />}
        </div>
      </div>
    </div>
  );
}
