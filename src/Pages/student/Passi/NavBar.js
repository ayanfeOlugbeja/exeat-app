import { Link, useLocation } from 'react-router-dom'
import React, { useState } from 'react'
import logo from './../../../Images/logo.png'
import Menu from './Menu'
import ProfilePopup from './profile/ProfilePopup'
import { BsFillPersonFill } from 'react-icons/bs'
import { FaUserCircle } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
export const Navbar = ({ currentUser }) => {
  const [popupVisible, setPopupVisible] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHomepage = location.pathname === '/'
  const isLoginpage = location.pathname === '/login'
  const isRegisterpage = location.pathname === '/register'
  const isRecoverpage = location.pathname === '/recover'
  const isVerifypage = location.pathname === '/verify'
  const isAdminpage = location.pathname === '/admin'
  const isProfilepage = location.pathname === '/profile'
  const isDepartmentpage = location.pathname === '/department'
  const isAdmindocs = location.pathname === '/admin/docs'
  const isAdminstudents = location.pathname === '/admin/students'
  const isDeptdocs = location.pathname === '/department/docs'
  const isDeptstudents = location.pathname === '/department/students'
  const isDashboard = location.pathname === '/passi'
  if (
    isHomepage ||
    isLoginpage ||
    isRegisterpage ||
    isRecoverpage ||
    isVerifypage ||
    isAdminpage ||
    isProfilepage ||
    isDepartmentpage ||
    isAdmindocs ||
    isAdminstudents ||
    isDeptdocs ||
    isDeptstudents ||
    isDashboard
  ) {
    return null
  }
  const displayPopup = () => {
    setPopupVisible(!popupVisible)
  }

  const handleProfileClick = () => {
    navigate('/passi/profile', { state: { currentUser } })
  }

  return (
    // <div>
    //   {popupVisible ? (
    //     <div className='popup-position'>
    //       <ProfilePopup currentUser={currentUser} />
    //     </div>
    //   ) : (
    //     <></>
    //   )}
    //   <div
    //     className='navBar  w-[100%] h-[12vh] p-2 '
    //     style={{ border: '2px solid black' }}
    //   >
    //     <div className='flex flex-row justify-around items-center ml-10 '>
    //       <Menu />
    //       <div className='navElements  w-[80%] h-[100%] flex flex-row justify-between mx-auto items-center '>
    //         <div className='w-[13%] flex flex-row items-center justify-around'>
    //           <img
    //             src={logo}
    //             alt='logo'
    //             className='w-[55px] h-[55px] rounded-2xl'
    //             style={{ border: '2px solid black' }}
    //           />
    //           <Link to='/' className='font-semibold tracking-widest text-lg'>
    //             GVU{' '}
    //           </Link>
    //         </div>
    //         {/* <div className='welcome-message'>
    //           {currentUser ? (
    //             <p>Welcome, {currentUser.displayName || currentUser.name}</p>
    //           ) : (
    //             <p>Welcome</p>
    //           )}
    //         </div> */}

    //         <img
    //           className='user-logo w-[60px] h-[60px] rounded-full'
    //           style={{ border: '2px solid black' }}
    //           src={currentUser?.imageLink}
    //           alt='user'
    //           onClick={displayPopup}
    //         />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className='flex flex-row items-center justify-center'>
      <div className='fixed flex justify-between top-0 w-full right-0 left-0 py-2 px-5 shadow bg-slate-50 z-[50]'>
        <div className='flex gap-2 items-center'>
          <Menu />
        </div>

        <h1 className='text-slate-900  self-center  uppercase text-[15px]  font-bold'>
          PASSI
        </h1>
        <h1 className='self-center text-[15px] uppercase font-bold '>GVU</h1>
        <div className='flex flex-row gap-1'>
          <button
            onClick={handleProfileClick}
            className='flex items-center text-slate-50 gap-2 md:text-[20px] bg-green-500 text-[15px]  p-2 h-fit rounded '
          >
            Profile <FaUserCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
