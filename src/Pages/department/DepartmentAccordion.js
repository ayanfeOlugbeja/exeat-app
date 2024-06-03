import React, { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './../../firebaseConfig'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import { getAllUsers } from './../../api/FirestoreAPI'
import { getPosts } from './../../api/FirestoreAPI'
import { BsNewspaper, BsFillCalendarEventFill } from 'react-icons/bs'
import { MdPictureAsPdf } from 'react-icons/md'
import { FaUsers } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { BsFillChatQuoteFill, BsBookHalf } from 'react-icons/bs'
import { MdReviews } from 'react-icons/md'

export const DepartmentAccordion = ({ currentUser }) => {
  const [users, setUsers] = useState([])
  const [posts, setPosts] = useState([])
  useEffect(() => {
    getAllUsers(setUsers)
  }, [])

  // const getCurrentUser = currentUser.id
  useEffect(() => {
    getPosts(setPosts)
  }, [])
  return (
    <div className='flex overflow-x-hidden flex-col gap-[50px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 py-[50px] items-center md:flex-row justify-center gap-5'>
        <div className='text-center bg-gradient-to-r  py-[25px] md:min-w-[300px] from-gray-200 to-gray-200 gap-2 px-[50px] rounded py-[10px] flex flex-col items-center'>
          <FaUsers className=' text-[50px] ' />
          <h1 className='uppercase font-bold '>Total Users</h1>
          <p className='text-[20px] font-semibold '>{users.length}</p>
        </div>

        <div className='text-center bg-gradient-to-r  gap-2 py-[25px] md:min-w-[300px] from-gray-200 to-gray-200 px-[50px] rounded py-[10px] flex flex-col items-center'>
          <BsNewspaper className=' text-[50px] ' />
          <h1 className='uppercase font-bold '>Total Exeats</h1>
          <p className='text-[20px] font-semibold '>{posts.length}</p>
        </div>

        <div className='text-center bg-gradient-to-r  py-[25px] md:min-w-[300px] from-gray-200 to-gray-200 px-[50px] gap-2 rounded py-[10px] flex flex-col items-center'>
          <BsFillCalendarEventFill className=' text-[50px] ' />
          <h1 className='uppercase font-bold '>Total Approved</h1>
          <p className='text-[20px] font-semibold '>All Approved</p>
        </div>

        <div className='text-center bg-gradient-to-r  py-[25px] md:min-w-[300px] from-gray-200 to-gray-200 gap-2 px-[50px] rounded py-[10px] flex flex-col items-center'>
          <BsBookHalf className=' text-[50px] ' />
          <h1 className='uppercase font-bold '>Pending Approval</h1>
          <p className='text-[20px] font-semibold '>Pending</p>
        </div>
      </div>
    </div>
  )
}
