import React from 'react';
import Access from './Access/Access';

// student dashboard
export default function HomeComponent() {
  return (
    <div className='p-8 text-center'>
      <h2 className='text-2xl font-bold mb-4'>
        Welcome to the Student Dashboard 👋🏾
      </h2>
      <p className='text-gray-600 mb-8'>
        Here you can manage your profile, requests, and more.
      </p>
      <Access />
    </div>
  );
}
