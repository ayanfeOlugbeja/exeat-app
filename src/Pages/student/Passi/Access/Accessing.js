import React, { useState, useMemo } from 'react';
// import { getCurrentTimeStamp } from '../../../helpers/useMoment';
import {
  postResponse,
  getPosts,
  updatePost,
} from '../../../../api/FirestoreAPI';

import AccessComponent from './AccessComponent';

function Accessing({ currentUser }) {
  const [status, setStatus] = useState('');
  const [allStatuses, setAllStatus] = useState([]);
  const [currentPost, setCurrentPost] = useState({});
  const [isEdit, setIsEdit] = useState(false);
  const [postImage, setPostImage] = useState('');
  const getEditData = (posts) => {
    setStatus(posts?.status);
    setCurrentPost(posts);
    setIsEdit(true);
  };

  // const updateStatus = () => {
  //   updatePost(currentPost.id, status, postImage);
  // };

  useMemo(() => {
    getPosts(setAllStatus);
  }, []);

  return (
    <>
      {allStatuses.map((posts) => {
        return (
          <div key={posts.id}>
            <AccessComponent
              posts={posts}
              getEditData={getEditData}
              style={{ border: '1px solid red' }}
              className='h-[200px]'
            />
          </div>
        );
      })}
    </>
  );
}

export default Accessing;
