import React, { useMemo, useState } from 'react';
import { getPosts } from '../../../../api/FirestoreAPI';

export default function AccessComponent({ currentUser }) {
  const [allPosts, setAllPosts] = useState([]);
  useMemo(() => {
    getPosts(setAllPosts);
  }, []);

  return (
    <div className='h-[100vh]'>
      <div className='title-bar h-[60px] flex items-center justify-end p-3'>
        <h2 className='text-2xl font-bold mr-24'>PASSI - Access Logs</h2>
      </div>
      <div
        className='w-[40%] h-auto mx-auto mt-20 flex flex-col gap-10 p-8 justify-center'
        style={{ border: '1px solid black' }}>
        {allPosts.map((posts) => {
          return (
            <div
              className='w-[100%] h-[100px]'
              style={{ border: '1px solid black' }}>
              <p>{posts.timestamp}</p>
              <p>{posts.status}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
