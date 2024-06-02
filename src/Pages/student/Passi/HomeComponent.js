import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BiSolidPaint } from 'react-icons/bi'
import { BsFillPersonFill } from 'react-icons/bs'
import { HiOutlineDocumentText } from 'react-icons/hi'
import { BiLogOut } from 'react-icons/bi'
import HomePopup from './HomePopup'

export default function HomeComponent({ currentUser }) {
  const [modalOpen, setModalOpen] = useState(false)
  let navigate = useNavigate()
  const handleCreateApplicationClick = () => {
    navigate('/passi/create', { state: { currentUser } })
  }
  const handleAccessApplicationClick = () => {
    navigate('/passi/logs', { state: { currentUser } })
  }
  const handleProfileClick = () => {
    navigate('/passi/profile', { state: { currentUser } })
  }

  return (
    <div className='flex overflow-x-hidden flex-col gap-[50px]'>
      <div className='grid grid-cols-1 md:grid-cols-2 py-[50px] items-center md:flex-row justify-center gap-5'>
        <div
          className='text-center bg-gradient-to-r  py-[25px] md:min-w-[300px] from-gray-200 to-gray-200 gap-2 px-[50px] rounded py-[10px] flex flex-col items-center'
          onClick={handleCreateApplicationClick}
        >
          <BiSolidPaint className=' text-[50px] ' />
          <h1 className='uppercase font-bold '>Create Exeat</h1>
        </div>

        {/* <div
          className='text-center bg-gradient-to-r  gap-2 py-[25px] md:min-w-[300px] from-gray-200 to-gray-200 px-[50px] rounded py-[10px] flex flex-col items-center'
          onClick={handleProfileClick}
        >
          <BsFillPersonFill className=' text-[50px] ' />
          <h1 className='uppercase font-bold '>Profile</h1>
        </div> */}

        <div className='text-center bg-gradient-to-r  py-[25px] md:min-w-[300px] from-gray-200 to-gray-200 px-[50px] gap-2 rounded py-[10px] flex flex-col items-center'>
          <HiOutlineDocumentText className=' text-[50px] ' />
          <h1
            className='uppercase font-bold '
            onClick={handleAccessApplicationClick}
          >
            History
          </h1>
        </div>

        <div className='text-center bg-gradient-to-r  py-[25px] md:min-w-[300px] from-gray-200 to-gray-200 gap-2 px-[50px] rounded py-[10px] flex flex-col items-center'>
          <HomePopup />

          <h1 className='uppercase font-bold '>Logout</h1>
        </div>
      </div>
    </div>
  )
}
