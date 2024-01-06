import React from 'react';
import { onLogout } from '../../../../api/AuthApi';
import { useNavigate } from 'react-router-dom';
export default function ProfilePopup({ currentUser }) {
  let navigate = useNavigate();
  const handleProfileClick = () => {
    navigate('/passi/profile', { state: { currentUser } });
  };
  return (
    <div
      className='profile-popup w-[200px] h-[140px] absolute right-28 top-20 p-5'
      style={{ border: '1px solid black', background: 'white' }}>
      <div className='flex flex-col flex-nowrap items-center space-y-3 justify-center font-semibold'>
        <p
          onClick={handleProfileClick}
          style={{ border: '1px solid black', borderRadius: '5px' }}
          className='w-[70px] text-center'>
          Profile
        </p>
        <p onClick={onLogout}>Logout</p>
      </div>
    </div>
  );
}
