import React, { useMemo, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal } from 'antd';
import { BsPencil, BsTrash } from 'react-icons/bs';
import {
  getCurrentUser,
  getAllUsers,
  deletePost,
  getConnections,
} from './../../../../api/FirestoreAPI';
import school from '../../../../Images/schoolLogo.png';

// import LikeButton from '../LikeButton';
// import './index.scss';

export default function AccessComponent({ posts, id, getEditData }) {
  let navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [imageModal, setImageModal] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  useEffect(() => {
    getConnections(currentUser.id, posts.userID, setIsConnected);
  }, [currentUser.id, posts.userID]);

  return currentUser.id === posts.userID ? (
    <div
      className='posts-card flex flex-col justify-center gap-5 min-h-[150px] h-auto w-[70%] mx-auto my-4'
      key={id}
      style={{ border: '3px solid blue' }}>
      {/* <div className='post-image-wrapper flex  justify-between flex-row items-center m-2'>
        <img
          alt='profile-image'
          className='profile-image w-[60px] h-[60px] rounded-full'
          src={
            allUsers
              .filter((item) => item.id === posts.userID)
              .map((item) => item.imageLink)[0]
          }
          style={{ border: '2px solid black' }}
        />
        <div>
          <p
            className='name'
            onClick={() =>
              navigate('/profile', {
                state: { id: posts?.userID, email: posts.userEmail },
              })
            }>
            {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p className='headline'>
            {allUsers.filter((user) => user.id === posts.userID)[0]?.headline}
          </p>
          <p className='timestamp'>{posts.timeStamp}</p>
        </div>
        {currentUser.id === posts.userID ? (
          <div className='action-container flex flex-row gap-3'>
            <BsPencil
              size={20}
              className='action-icon'
              onClick={() => getEditData(posts)}
            />
            <BsTrash
              size={20}
              className='action-icon'
              onClick={() => deletePost(posts.id)}
            />
          </div>
        ) : (
          <></>
        )}
      </div> */}
      <div className='header flex'>
        <img src={school} alt='school logo' className='w-[200px] h-[200px]' />
        <div className='text'>
          <p>GLORIOUS VISION UNIVERSITY</p>
          <p>STUDENTS EXEAT FORM</p>
        </div>
      </div>
      <div className='body'>
        <img src='' alt='' className='profile-image' />
        <div>
          <p>
            NAME: {allUsers.filter((user) => user.id === posts.userID)[0]?.name}
          </p>
          <p>
            DEPARTMENT:{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.department}
          </p>
          <p>
            COURSE:{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.course}
          </p>
          <p>
            ACADEMIC LEVEL:{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.level}
          </p>
          <p>
            GENDER:{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.gender}
          </p>
          <p>
            ROOM NUMBER:{' '}
            {allUsers.filter((user) => user.id === posts.userID)[0]?.room}
          </p>
        </div>
        <div className='request'>
          <p
            className='status'
            dangerouslySetInnerHTML={{ __html: posts.status }}></p>
        </div>
      </div>
      {posts.postImage ? (
        <img
          onClick={() => setImageModal(true)}
          src={posts.postImage}
          className='post-image w-[120px] h-[100px]'
          alt='post-image'
        />
      ) : (
        <></>
      )}

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
          className='post-image modal w-[800px] h-[600px] mx-auto my-auto p-4'
          alt='post-image'
          style={{ objectFit: 'cover' }}
        />
      </Modal>
    </div>
  ) : (
    <></>
  );
}
