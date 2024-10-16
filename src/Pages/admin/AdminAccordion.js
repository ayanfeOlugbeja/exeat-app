import React, { useEffect, useState } from 'react';
import { getAllUsers, getPosts } from './../../api/FirestoreAPI'; // Combined imports
import {
  BsNewspaper,
  BsFillCalendarEventFill,
  BsBookHalf,
} from 'react-icons/bs';
import { FaUsers } from 'react-icons/fa';

export const AdminAccordion = ({ currentUser }) => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [approvedExeats, setApprovedExeats] = useState(0);
  const [pendingExeats, setPendingExeats] = useState(0);

  // Fetch users
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  // Fetch posts and calculate approved and pending exeats
  useEffect(() => {
    getPosts((fetchedPosts) => {
      setPosts(fetchedPosts);

      // Calculate approved exeats (where adminApproved is true)
      const approved = fetchedPosts.filter(
        (post) => post.adminApproved === true
      );
      setApprovedExeats(approved.length);

      // Calculate pending exeats (where departmentApproved is true, adminApproved is false, and rejected is false)
      const pending = fetchedPosts.filter(
        (post) =>
          post.departmentApproved === true &&
          post.adminApproved === false &&
          post.rejected === false
      );
      setPendingExeats(pending.length);
    });
  }, []);

  return (
    <div className='flex overflow-x-hidden flex-col gap-[50px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 py-[50px] items-center md:flex-row justify-center gap-5'>
        {/* Total Users */}
        <div className='text-center bg-gradient-to-r  md:min-w-[300px] from-gray-200 to-gray-200 gap-2 px-[50px] rounded py-[10px] flex flex-col items-center'>
          <FaUsers className=' text-[50px]' />
          <h1 className='uppercase font-bold'>Total Users</h1>
          <p className='text-[20px] font-semibold'>{users.length}</p>
        </div>

        {/* Total Exeats */}
        <div className='text-center bg-gradient-to-r  gap-2  md:min-w-[300px] from-gray-200 to-gray-200 px-[50px] rounded py-[10px] flex flex-col items-center'>
          <BsNewspaper className=' text-[50px]' />
          <h1 className='uppercase font-bold'>Total Exeats</h1>
          <p className='text-[20px] font-semibold'>{posts.length}</p>
        </div>

        {/* Total Approved Exeats */}
        <div className='text-center bg-gradient-to-r md:min-w-[300px] from-gray-200 to-gray-200 px-[50px] gap-2 rounded py-[10px] flex flex-col items-center'>
          <BsFillCalendarEventFill className=' text-[50px]' />
          <h1 className='uppercase font-bold'>Total Approved</h1>
          <p className='text-[20px] font-semibold'>{approvedExeats}</p>
        </div>

        {/* Pending Exeats */}
        <div className='text-center bg-gradient-to-r md:min-w-[300px] from-gray-200 to-gray-200 gap-2 px-[50px] rounded py-[10px] flex flex-col items-center'>
          <BsBookHalf className=' text-[50px]' />
          <h1 className='uppercase font-bold'>Pending Approval</h1>
          <p className='text-[20px] font-semibold'>{pendingExeats}</p>
        </div>
      </div>
    </div>
  );
};
