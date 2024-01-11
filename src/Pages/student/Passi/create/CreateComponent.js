import React, { useState, useMemo } from 'react';
import {
  postResponse,
  getPosts,
  updatePost,
} from '../../../../api/FirestoreAPI';
import { Button, Modal, Progress } from 'antd';
import { AiOutlinePicture } from 'react-icons/ai';
import ReactQuill from 'react-quill';
// import { DatePicker, Space } from 'antd';

import { getCurrentTimestamp } from '../../../../helpers/useMoment';
import { getUniqueID } from '../../../../helpers/getUniqueID';
import { uploadPostImage } from '../../../../api/ImageUpload';

export default function CreateComponent({ currentUser }) {
  const [status, setStatus] = useState('');
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState('');
  console.log(currentUser);
  const sendRequest = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimestamp('LLL'),
      userEmail: currentUser.email,
      userName: currentUser.name,
      matricNumber: currentUser.matricNumber,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage: postImage,
    };
    await postResponse(object);
    setIsEdit(false);
    await setStatus('');
  };
  const getEditData = (posts) => {
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage);
  };

  useMemo(() => {
    getPosts(setAllStatus);
  }, []);

  // const { RangePicker } = DatePicker;
  const [progress, setProgress] = useState(0);
  return (
    <div className='h-[100vh] text-green'>
      <div className='title-bar h-[60px] flex items-center justify-end p-3'>
        <h2 className='text-2xl font-bold mr-24'>PASSI - Create Exeat</h2>
      </div>

      {/* <div className='w-[40%] h-[60%] mx-auto mt-20 '>
        <div
          className='input-bar w-[95%] h-[95%] flex flex-col  items-center p-2 mx-auto m-4'
          style={{ border: '1px solid black' }}>
          <input
            type='text'
            placeholder='Reason for request?'
            className='w-[80%] h-[50px] rounded'
            style={{ border: '1px solid #212121' }}
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            required
          /> */}

      {/* <Space direction='vertical' size={10}>
            <RangePicker required />
          </Space> */}
      <div className='w-[700px] h-auto min-h-[350px] mx-auto mt-10'>
        <div className='posts-body w-[700px] min-h-[350px] h-auto'>
          <ReactQuill
            className='modal-input'
            theme='snow'
            value={status}
            placeholder='Share Request reasons....'
            onChange={setStatus}
          />
          {progress === 0 || progress === 100 ? (
            <></>
          ) : (
            <div className='progress-bar'>
              <Progress type='circle' percent={progress} />
            </div>
          )}
          {postImage?.length > 0 || currentPost?.postImage?.length ? (
            <img
              className='preview-image w-[700px] h-[400px]'
              src={postImage || currentPost?.postImage}
              alt='postImage'
            />
          ) : (
            <></>
          )}
        </div>
        <div className='flex justify-between flex-row gap-x-52'>
          <label for='pic-upload'>
            <AiOutlinePicture size={35} className='picture-icon' />
          </label>
          <input
            id='pic-upload'
            type={'file'}
            hidden
            onChange={(event) =>
              uploadPostImage(event.target.files[0], setPostImage, setProgress)
            }
          />

          <Button
            onClick={isEdit ? updateStatus : sendRequest}
            key='submit'
            type='primary'
            disabled={status.length > 0 ? false : true}>
            {isEdit ? 'Update' : 'Post'}
          </Button>
        </div>
      </div>
    </div>
  );
}
