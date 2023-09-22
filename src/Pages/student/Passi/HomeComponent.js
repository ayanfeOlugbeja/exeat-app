import React from 'react';
import { onAuthStateChanged } from 'firebase/auth';
export default function HomeComponent() {
  return (
    <div className='h-[100vh] w-[100vw]'>
      <div className='welcome-title'>
        <h2>Welcome to PASSI</h2>
      </div>
      <div className='relative cards w-[45%] h-[84%] mx-auto flex flex-row flex-wrap gap-10 p-4 items-center justify-center'>
        <div
          className='w-[40%] h-[46%]'
          style={{ border: '2px solid black' }}></div>
        <div
          className='w-[40%] h-[46%]'
          style={{ border: '2px solid black' }}></div>
        <div
          className='w-[40%] h-[46%]'
          style={{ border: '2px solid black' }}></div>
        <div
          className='w-[40%] h-[46%]'
          style={{ border: '2px solid black' }}></div>
      </div>
    </div>
  );
}
