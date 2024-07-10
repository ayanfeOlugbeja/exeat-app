import React, { useMemo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from 'antd'
import { BsPencil, BsTrash } from 'react-icons/bs'
import school from './../../../../Images/schoolLogo.png'
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
} from './../../../../api/FirestoreAPI'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore'
import { db } from './../../../../firebaseConfig'

export default function DocumentComponent({ posts, id }) {
  const [currentUser, setCurrentUser] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [imageModal, setImageModal] = useState(false)
  const [exeatModal, setExeatModal] = useState(false)

  useMemo(() => {
    getCurrentUser(setCurrentUser)
    getAllUsers(setAllUsers)
  }, [])

  const approveExeat = async (id) => {
    const thePost = doc(db, 'posts', id)
    try {
      await updateDoc(thePost, {
        adminApproved: true,
      })
    } catch (error) {
      alert(error)
    }
  }
  const rejectExeat = async (id) => {
    const thePost = doc(db, 'posts', id)
    try {
      await updateDoc(thePost, {
        Rejected: true,
      })
    } catch (error) {
      alert(error)
    }
  }

  return posts.departmentApproved && !posts.adminApproved && !posts.Rejected ? (
    <div
      className='posts-card min-h-[150px] max-h-[630px] lg:max-h-[550px] w-[867px] max-w-[90vw] my-2'
      key={id}
      style={{ border: '3px solid blue', background: '#ceeff8' }}
    >
      <div className='header flex flex-row justify-between w-[100%] items-center gap-3 lg:w-[70%]'>
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
          className='profile-image w-[180px] h-[180px]'
        />
        <div className='text-sm w-[50%] font-semibold '>
          <p>
            <span className='font-bold'>NAME: </span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p>
            <span className='font-bold'>MATRIC NUMBER: </span>{' '}
            {
              allUsers.filter((user) => user.id === posts.userID)[0]
                ?.matricNumber
            }
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
            <span className='font-bold'> Departure:</span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.departure}
          </p>
          <p>
            <span className='font-bold'> Arrival:</span>{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.arrival}
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
        </div>
      </div>
      <div className='request text-center text-3xl font-bold flex gap-2 items-center  flex-col'>
        <p
          className='status'
          dangerouslySetInnerHTML={{ __html: posts.overview }}
        ></p>

        <p
          className=' cursor-pointer text-rose-800 text-base font-light'
          onClick={() => setExeatModal(true)}
        >
          View Exeat Request
        </p>
      </div>
      <div className='flex flex-row justify-between items-center'>
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
      </div>
      <div className='flex justify-between items-end'>
        <button
          className='bg-slate-900 w-fit shadow py-2 px-5 rounded text-slate-50 text-[13px] hover:bg-slate-700 self-center'
          key='submit'
          type='primary'
          onClick={() => {
            approveExeat(posts.id)
          }}
        >
          Approve Exeat
        </button>

        <button
          className='bg-rose-900 w-fit shadow py-2 px-5 rounded text-slate-50 text-[13px] hover:bg-slate-700 self-end'
          key='submit'
          type='primary'
          onClick={() => {
            rejectExeat(posts.id)
          }}
        >
          Reject Exeat
        </button>
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
    </div>
  ) : (
    <></>
  )
}
