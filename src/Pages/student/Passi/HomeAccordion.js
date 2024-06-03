import React from 'react'
import { Link } from 'react-router-dom'
import { HiXMark } from 'react-icons/hi2'
import { useState } from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { AiOutlineMenu, AiFillDashboard } from 'react-icons/ai'
import { BsNewspaper } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { MdCreate } from 'react-icons/md'
import HomeComponent from './HomeComponent'
import Profile from './profile/Profile'
import Create from './create/Create'
import Access from './Access/Access'
import HomePopup from './HomePopup'
export const HomeAccordion = ({ currentUser }) => {
  const [displaying, setDisplaying] = useState(
    JSON.parse(localStorage.getItem('displaying')) || {
      viewDashboard: true,
      viewProfile: false,
      viewDashboardColor: 'text-green-500',
      viewProfileColor: 'text-slate-700',
    }
  )
  const [sideLinks, setSideLinks] = useState({
    nextIc: true,
    prevIc: false,
    textSize: 'text-[8px]',
    flexType: 'flex-col',
  })
  const [showBar, setShowBar] = useState('hidden')
  const [sideLinkState, setSideLinkState] = useState('hidden')

  return (
    // mainUser[0]?.stats !== 'admin' ? navig('/login'):
    <div className=' z-[100] bg-white  min-h-[100vh] fixed overflow-y-auto w-full left-0 right-0 top-0 pb-[100px] pt-[70px] bottom-0 '>
      <div className='flex flex-row items-center justify-center'>
        <div className='fixed flex justify-between top-0 w-full right-0 left-0 py-2 px-5 shadow bg-slate-50 z-[50]'>
          <div className='flex gap-2 items-center'>
            <div>
              {sideLinks.prevIc && (
                <HiXMark
                  onClick={() => {
                    setSideLinkState('hidden')
                    setSideLinks({
                      nextIc: true,
                      prevIc: false,
                      textSize: 'text-[8px]',
                      flexType: 'flex-col',
                    })
                    setShowBar('hidden')
                  }}
                  className={`bg-slate-50  p-1 rounded-[2px] text-[20px] md:text-[20px]`}
                />
              )}

              {sideLinks.nextIc && (
                <AiOutlineMenu
                  onClick={() => {
                    setSideLinkState('flex')
                    setSideLinks({
                      nextIc: false,
                      prevIc: true,
                      textSize: 'text-[13px]',
                      flexType: 'flex-row',
                    })
                    setShowBar('flex')
                  }}
                  className={`bg-slate-50  p-1 rounded-[2px] text-[20px] md:text-[20px]`}
                />
              )}
            </div>
            {/*<img className="max-w-[50px]" src={logo} alt="" />*/}
            {
              <h1 className='text-slate-900 md:flex  uppercase text-[12px] md:text-[20px] font-bold'>
                PASSI
              </h1>
            }
          </div>
          <h1 className='self-center text-[15px] uppercase font-semibold '>
            Dashboard
          </h1>

          <div className='flex flex-row gap-1'>
            <button
              onClick={() =>
                setDisplaying({
                  pdfView: false,
                  viewDashboard: false,
                  viewProfile: true,
                  pdfPost: false,
                  newsPost: false,
                  userView: false,
                  viewAllNews: false,
                  viewEditNews: false,
                  pdfViewColor: 'text-slate-700',
                  viewDashboardColor: 'text-slate-700',
                  viewProfileColor: 'text-green-500',
                  pdfPostColor: 'text-slate-700',
                  newsPostColor: 'text-slate-500',
                  userViewColor: 'text-slate-700',
                  viewAllNewsColor: 'text-slate-700',
                  viewEditNewsColor: 'text-slate-700',
                })
              }
              className='flex items-center text-slate-50 gap-2 md:text-[20px] bg-green-500 text-[15px]  p-2 h-fit rounded '
            >
              Profile <FaUserCircle />
            </button>
          </div>
        </div>
        <div
          className={`bg-slate-50 lg:flex ${showBar} shadow z-[10] bottom-0 p-1 md:p-5 fixed  top-0 left-0 h-[100%]`}
        >
          <div>
            <ul className='flex flex-col px-[5px] pt-[70px] gap-[25px]'>
              <li>
                <Link
                  to='/'
                  onClick={() => {
                    setSideLinks({
                      nextIc: true,
                      prevIc: false,
                      textSize: 'text-[8px]',
                      flexType: 'flex-col',
                    })
                    setShowBar('hidden')
                    setDisplaying({
                      viewDashboard: true,
                      viewProfile: false,
                      viewDashboardColor: 'text-green-500',
                      viewProfileColor: 'text-slate-700',
                    })
                  }}
                  className={`${sideLinks.flexType}   flex items-center gap-x-2  `}
                >
                  {' '}
                  <AiFillHome
                    className={`text-slate-700 text-[17px] md:text-[20px] `}
                  />{' '}
                  <span className={`${sideLinks.textSize}  text-slate-900   `}>
                    Home
                  </span>{' '}
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setSideLinks({
                      nextIc: true,
                      prevIc: false,
                      textSize: 'text-[8px]',
                      flexType: 'flex-col',
                    })
                    setShowBar('hidden')
                    setDisplaying({
                      pdfView: false,
                      viewDashboard: true,
                      viewProfile: false,
                      pdfPost: false,
                      newsPost: false,
                      userView: false,
                      viewAllNews: false,
                      viewEditNews: false,
                      pdfViewColor: 'text-slate-700',
                      viewDashboardColor: 'text-green-500',
                      viewProfileColor: 'text-slate-700',
                      pdfPostColor: 'text-slate-700',
                      newsPostColor: 'text-slate-700',
                      userViewColor: 'text-slate-700',
                      viewAllNewsColor: 'text-slate-700',
                      viewEditNewsColor: 'text-slate-700',
                    })
                  }}
                  className={`${sideLinks.flexType}   flex items-center gap-x-2  `}
                >
                  {' '}
                  <AiFillDashboard
                    className={`${displaying.viewDashboardColor} text-[17px] md:text-[20px] `}
                  />{' '}
                  <span className={`${sideLinks.textSize}  text-slate-900   `}>
                    Dashboard
                  </span>{' '}
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setSideLinks({
                      nextIc: true,
                      prevIc: false,
                      textSize: 'text-[8px]',
                      flexType: 'flex-col',
                    })
                    setShowBar('hidden')
                    setDisplaying({
                      pdfView: false,
                      viewDashboard: false,
                      viewProfile: false,
                      pdfPost: false,
                      newsPost: true,
                      userView: false,
                      viewAllNews: false,
                      viewEditNews: false,
                      pdfViewColor: 'text-slate-700',
                      viewDashboardColor: 'text-slate-700',
                      viewProfileColor: 'text-slate-700',
                      pdfPostColor: 'text-slate-700',
                      newsPostColor: 'text-green-500',
                      userViewColor: 'text-slate-700',
                      viewAllNewsColor: 'text-slate-700',
                      viewEditNewsColor: 'text-slate-700',
                    })
                  }}
                  className={`${sideLinks.flexType}   flex items-center gap-x-2  `}
                >
                  <BsNewspaper
                    className={`${displaying.newsPostColor} text-[17px] md:text-[20px] `}
                  />
                  <span className={`${sideLinks.textSize} text-slate-900   `}>
                    Exeats
                  </span>{' '}
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setSideLinks({
                      nextIc: true,
                      prevIc: false,
                      textSize: 'text-[8px]',
                      flexType: 'flex-col',
                    })
                    setShowBar('hidden')
                    setDisplaying({
                      pdfView: false,
                      viewDashboard: false,
                      viewProfile: false,
                      pdfPost: false,
                      newsPost: false,
                      userView: false,
                      viewAllNews: false,
                      viewEditNews: true,
                      pdfViewColor: 'text-slate-700',
                      viewDashboardColor: 'text-slate-700',
                      viewProfileColor: 'text-green-500',
                      pdfPostColor: 'text-slate-700',
                      newsPostColor: 'text-slate-500',
                      userViewColor: 'text-slate-700',
                      viewAllNewsColor: 'text-slate-700',
                      viewEditNewsColor: 'text-slate-700',
                    })
                  }}
                  className={`${sideLinks.flexType}   flex items-center gap-x-2  `}
                >
                  <MdCreate
                    className={`${displaying.EditNews} text-[17px] md:text-[20px] `}
                  />
                  <span className={`${sideLinks.textSize} text-slate-900   `}>
                    Create
                  </span>{' '}
                </Link>
              </li>
              <li>
                <Link
                  onClick={() => {
                    setSideLinks({
                      nextIc: true,
                      prevIc: false,
                      textSize: 'text-[8px]',
                      flexType: 'flex-col',
                    })
                    setShowBar('hidden')
                    setDisplaying({
                      pdfView: false,
                      viewDashboard: false,
                      viewProfile: true,
                      pdfPost: false,
                      newsPost: false,
                      userView: false,
                      viewAllNews: false,
                      viewEditNews: false,
                      pdfViewColor: 'text-slate-700',
                      viewDashboardColor: 'text-slate-700',
                      viewProfileColor: 'text-green-500',
                      pdfPostColor: 'text-slate-700',
                      newsPostColor: 'text-slate-500',
                      userViewColor: 'text-slate-700',
                      viewAllNewsColor: 'text-slate-700',
                      viewEditNewsColor: 'text-slate-700',
                    })
                  }}
                  className={`${sideLinks.flexType}   flex items-center gap-x-2  `}
                >
                  <FaUserCircle
                    className={`${displaying.viewProfileColor} text-[17px] md:text-[20px] `}
                  />
                  <span className={`${sideLinks.textSize} text-slate-900   `}>
                    Profile
                  </span>{' '}
                </Link>
              </li>
              <li></li>
              <li></li>
              <li>
                <HomePopup />
                <p className=' text-slate-900 text-sm'>Logout</p>
              </li>
            </ul>
          </div>
        </div>

        <div className='py-[10px] relative flex justify-center  lg:ml-[30px] '>
          <div>{displaying.viewDashboard && <HomeComponent />}</div>
          <div>{displaying.viewProfile && <Profile />}</div>
          <div> {displaying.newsPost && <Access />}</div>
          <div> {displaying.viewEditNews && <Create />}</div>
        </div>
      </div>
    </div>
  )
}
