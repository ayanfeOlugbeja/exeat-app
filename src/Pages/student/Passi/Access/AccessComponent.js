import React, { useMemo, useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { BsPencil, BsTrash } from 'react-icons/bs'
import { getCurrentUser, getAllUsers } from './../../../../api/FirestoreAPI'
import { useReactToPrint } from 'react-to-print'
import school from '../../../../Images/schoolLogo.png'
import label from './../../../../Images/label.png'
import rejected from './../../../../Images/rejected.png'
import { Content } from 'antd/es/layout/layout'

export default function AccessComponent({ posts, id, getEditData }) {
  const [currentUser, setCurrentUser] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [exeatModal, setExeatModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  let navigate = useNavigate()
  useMemo(() => {
    getCurrentUser(setCurrentUser)
    getAllUsers(setAllUsers)
  }, [])
  const printRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })
  console.log(posts.arrival, posts.departure)

  return currentUser.id === posts.userID ? (
    <div
      className=' posts-card min-h-[150px] max-h-[580px] lg:max-h-[550px] w-[867px] max-w-[90vw]   bg-transparent relative'
      key={id}
      style={{ border: '3px solid blue' }}
      ref={printRef}
    >
      <div className='z-50 header flex flex-row justify-between w-[100%] items-center gap-3 lg:w-[70%]'>
        <img src={school} alt='school logo' className='w-[100px] h-[100px]' />
        <div className='text-center lg:text-2xl font-extrabold text-base flex justify-between gap-2 flex-col'>
          <p>GLORIOUS VISION UNIVERSITY</p>
          <p>STUDENTS EXEAT FORM</p>
        </div>
      </div>
      <div className='body my-[10px] flex flex-row justify-evenly'>
        <img
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
          alt=''
          className='profile-image lg:w-[180px] lg:h-[180px] flex self-center w-[150px] h-[150px]'
        />
        <div className='text-sm w-[50%] font-semibold '>
          <p>
            <span className='font-bold'>NAME: </span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p>
            <span className='font-bold'>DEPARTMENT: </span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.department}
          </p>
          <p>
            <span className='font-bold'> COURSE:</span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.course}
          </p>
          <p>
            <span className='font-bold'> ACADEMIC LEVEL:</span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.level}
          </p>
          <p>
            <span className='font-bold'>GENDER: </span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.gender}
          </p>
          <p>
            <span className='font-bold'> ROOM NUMBER:</span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.room}
          </p>
          <p>
            {' '}
            <span className='font-bold'>PHONE NUMBER: </span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.phone}
          </p>
          <p>
            {' '}
            <span className='font-bold'>PARENT'S NUMBER: </span>{' '}
            {
              allUsers.filter((user) => user.id === posts.userID)[0]
                ?.parentPhone
            }
          </p>
          <p>
            {' '}
            <span className='font-bold'>DEPARTURE: </span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.departure}
          </p>
          <p>
            {' '}
            <span className='font-bold'>ARRIVAL: </span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.arrival}
          </p>
        </div>
      </div>
      <div className='request text-center text-3xl font-bold flex gap-2 items-center  flex-col'>
        <p
          className='status'
          dangerouslySetInnerHTML={{ __html: posts.overview }}
        ></p>

        <p
          className=' cursor-pointer text-rose-800 text-base font-light z-100'
          onClick={() => setExeatModal(true)}
        >
          View Exeat Request
        </p>
      </div>
      <div className='flex flex-row justify-between  items-center'>
        <div className='flex flex-row items-center'>
          {posts.postImage ? (
            <img
              src={posts.postImage}
              className='post-image w-[80px] h-[60px] object-contain'
              alt='exeatImg'
            />
          ) : (
            <></>
          )}
          {posts.postImage ? (
            <p
              className=' cursor-pointer text-blue-800'
              onClick={() => setImageModal(true)}
            >
              View Attachment
            </p>
          ) : (
            <></>
          )}
        </div>
        {posts.adminApproved ? (
          <button
            className='bg-slate-900 w-fit   shadow py-2 px-5 rounded text-slate-50 text-[13px] hover:bg-slate-700 '
            key='submit'
            type='primary'
            onClick={handlePrint}
          >
            Print Exeat
          </button>
        ) : (
          <></>
        )}
      </div>

      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}
      >
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className='post-image modal w-[1000px] h-[600px] mx-auto my-auto p-4 object-contain'
          alt='exeatImg'
        />
      </Modal>

      <Modal
        centered
        open={exeatModal}
        onOk={() => setExeatModal(false)}
        onCancel={() => setExeatModal(false)}
        footer={[]}
        className='w-[1400px] h-[600px] '
      >
        <div className='w-[1400px] h-[600px] flex flex-col gap-2 p-2 items-start justify-center'>
          <p
            className='status w-[450px]  font-bold text-lg'
            dangerouslySetInnerHTML={{ __html: posts.overview }}
          ></p>
          <p
            className='status w-[450px] h-[500px] text-justify font-medium '
            dangerouslySetInnerHTML={{ __html: posts.status }}
          ></p>
        </div>
      </Modal>

      {posts.adminApproved ? (
        <div>
          <img
            src={label}
            alt='label'
            className='absolute top-20 right-2 opacity-20'
          />
          <img
            src={school}
            alt='school'
            className='absolute top-0 right-7 opacity-10 w-3/5 h-3/5 object-contain z-0'
          />
        </div>
      ) : (
        <></>
      )}

      {posts.Rejected ? (
        <div>
          <img
            src={rejected}
            alt='exeat rejected'
            className='absolute top-20 right-2 opacity-90'
          />
          <img
            src={school}
            alt='school'
            className='absolute top-0 right-7 opacity-60 w-3/5 h-3/5 object-contain z-0'
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  ) : (
    <></>
  )
}
