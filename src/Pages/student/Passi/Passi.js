import React, { useEffect, useState, useMemo } from 'react';
import HomeComponent from './HomeComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../../../api/FirestoreAPI';
import { auth } from '../../../firebaseConfig';
import Loader from '../Components/common/Loader';
const Passi = () => {
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
  useMemo(() => {
    getCurrentUser();
  }, []);

  return loading ? <Loader /> : <HomeComponent />;
};

export default Passi;
