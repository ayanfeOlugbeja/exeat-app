import React from 'react';
import { onLogout } from '../../../../api/AuthApi';
export default function ProfilePopup({ currentUser }) {
  return (
    <div
      className='profile-popup w-[200px] h-[140px] absolute right-28 top-20'
      style={{ border: '1px solid black', background: 'white' }}>
      <ul className='popup-options'>
        <li onClick={onLogout}>Logout</li>
      </ul>
    </div>
  );
}
