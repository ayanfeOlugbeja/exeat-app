import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { BsPencil, BsTrash } from 'react-icons/bs';
import school from './../../../../Images/schoolLogo.png';
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,
} from './../../../../api/FirestoreAPI';

// import LikeButton from '../LikeButton';
// import './index.scss';

export default function DocumentComponent({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [profileModal, setProfileModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const openProfileModal = () => {
    setProfileModal(true);
  };

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  // useEffect(() => {
  //   getConnections(currentUser.id, posts.userID, setIsConnected);
  // }, [currentUser.id, posts.userID]);

  return currentUser.department === posts.department ? (
    <div
      className='posts-card min-h-[150px] max-h-[470px]  w-[60%] mx-auto my-4'
      key={id}
      style={{ border: '3px solid blue', background: '#ceeff8' }}>
      <div className='header flex flex-row justify-between w-[70%] items-center'>
        <img src={school} alt='school logo' className='w-[100px] h-[100px]' />
        <div className='text-center text-2xl font-extrabold'>
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
        </div>
      </div>
      <div className='request text-center text-base mx-2 my-2'>
        <p
          className='status'
          dangerouslySetInnerHTML={{ __html: posts.status }}></p>
      </div>
      <div className='flex flex-row items-center'>
        {posts.postImage ? (
          <img
            src={posts.postImage}
            className='post-image w-[80px] h-[60px]'
            alt='post-image'
          />
        ) : (
          <></>
        )}
        <p
          className=' cursor-pointer text-blue-800'
          onClick={() => setImageModal(true)}>
          View Attachment
        </p>
      </div>

      {/* <LikeButton
        userId={currentUser?.id}
        postId={posts.id}
        currentUser={currentUser}
      /> */}

      <Modal
        centered
        open={imageModal}
        onOk={() => setImageModal(false)}
        onCancel={() => setImageModal(false)}
        footer={[]}>
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className='post-image modal w-[1000px] h-[600px] mx-auto my-auto p-4'
          alt='post-image'
          style={{ objectFit: 'cover' }}
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
