import React, { useEffect, useState } from 'react';
import Docs from './Docs';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../../../firebaseConfig';
import Loader from '../../../student/Components/common/Loader';
import SideBar from './../../SideBar';
const Document = ({ currentUser }) => {
  const [loading, setLoading] = useState(true);

  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate('/login');
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      {loading ? (
        <Loader />
      ) : (
        <>
          <SideBar />
          <Docs currentUser={currentUser} />
        </>
      )}
    </div>
  );
};

export default Document;
