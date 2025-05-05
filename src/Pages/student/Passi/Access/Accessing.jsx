import React, { useState, useMemo } from 'react'
import { getPosts } from '../../../../api/FirestoreAPI'
import AccessComponent from './AccessComponent'

function Accessing({ currentUser }) {
  const [allStatuses, setAllStatus] = useState([])

  useMemo(() => {
    getPosts(setAllStatus)
  }, [])

  // Filter posts that belong to the current user
  const userPosts = allStatuses.filter(
    (post) => post.userID === currentUser?.id
  )

  return (
    <div className='flex flex-col items-center w-full'>
      {userPosts.length > 0 ? (
        userPosts.map((post) => <AccessComponent key={post.id} posts={post} />)
      ) : (
        <div className='w-full flex flex-col items-center justify-center py-16 text-center text-gray-600'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-32 w-32 text-gray-300 mb-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={1.5}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M9.75 9.75h.008v.008H9.75V9.75zM14.25 9.75h.008v.008h-.008V9.75zM7.5 16.5h9M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
          <p className='text-lg font-semibold'>No Exeat Requests Found</p>
          <p className='text-sm text-gray-400 mt-2'>
            You haven’t submitted any Exeat requests yet.
          </p>
        </div>
      )}
    </div>
  )
}

export default Accessing
