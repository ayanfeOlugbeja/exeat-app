import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BiSolidPaint } from 'react-icons/bi';
import { BsFillPersonFill } from 'react-icons/bs';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { BiLogOut } from 'react-icons/bi';
import { onLogout } from '../../../api/AuthApi';
export default function HomeComponent() {
  let navigate = useNavigate();
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
          onClick={() => navigate('/passi/create')}
          style={{ border: '2px solid black' }}>
          <BiSolidPaint className='w-[90px] h-[70px]' />
          <p className='font-bold'>Create Application</p>
        </div>
        <div
          className='w-[40%] h-[46%] flex flex-col flex-nowrap items-center justify-center p-2 gap-8'
          onClick={() => navigate('/passi/profile')}
          style={{ border: '2px solid black' }}>
          <BsFillPersonFill className='w-[90px] h-[70px]' />
          <p className='font-bold'>Profile</p>
        </div>
        <div
          className='w-[40%] h-[46%] flex flex-col flex-nowrap items-center justify-center p-2 gap-8'
          onClick={() => navigate('/passi/logs')}
          style={{ border: '2px solid black' }}>
          <HiOutlineDocumentText className='w-[90px] h-[70px]' />
          <p className='font-bold'>Access Logs</p>
        </div>
        <div
          className='w-[40%] h-[46%] flex flex-col flex-nowrap items-center justify-center p-2 gap-8'
          onClick={onLogout}
          style={{ border: '2px solid black' }}>
          <BiLogOut className='w-[90px] h-[70px]' />
          <p className='font-bold'>Logout</p>
        </div>
      </div>
    </div>
  );
}
