import React, { useEffect, useState, useMemo } from 'react';
import HomeComponent from './HomeComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../api/FirestoreAPI';
import { auth } from '../../../firebaseConfig';
import Loader from '../Components/common/Loader';

const Passi = () => {
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState({});

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
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div>
      {loading ? <Loader /> : <HomeComponent currentUser={currentUser} />}
    </div>
  );
};

export default Passi;
