import React, { useState } from 'react';
import { onLogout } from '../../../api/AuthApi';
import { BiLogOut } from 'react-icons/bi';

export default function HomePopup() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleLogout = () => {
    onLogout();
    setIsModalOpen(false); // Close the modal after logout
  };

  return (
    <div>
      {isModalOpen && (
        <div className='fixed inset-0 flex items-center justify-center z-50'>
          <div
            className='modal fixed inset-0 bg-gray-800 bg-opacity-70 z-50'
            onClick={handleCloseModal}></div>
          <div className='modal-container bg-white w-[400px] p-4 rounded-lg shadow-lg z-50'>
            <p className='text-black text-lg'>
              Are you sure you want to LOGOUT?
            </p>
            <div className='mt-4 flex justify-end'>
              <button
                onClick={handleLogout}
                className='bg-blue-500 text-white px-4 py-2 rounded-md mr-2'>
                Logout
              </button>
              <button
                onClick={handleCloseModal}
                className='bg-gray-300 text-black px-4 py-2 rounded-md'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <BiLogOut onClick={handleOpenModal} className='w-[90px] h-[70px]' />
      {/* <div
        className='w-[221px] h-[247px] flex flex-col flex-nowrap items-center justify-center p-2 gap-8 z-50'
        onClick={handleOpenModal}
        style={{ border: '2px solid black' }}>
        {/* <BiLogOut className='w-[90px] h-[70px]' /> */}
      {/* <p className='font-bold'>Logout</p>
      </div> */}{' '}
    </div>
  );
}
