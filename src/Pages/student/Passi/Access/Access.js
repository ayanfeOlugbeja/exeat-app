import React, { useEffect, useState } from 'react';
import AccessComponent from './AccessComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { auth } from '../../../../firebaseConfig';
import Loader from '../../Components/common/Loader';
import { useLocation } from 'react-router-dom';

const Access = () => {
  const location = useLocation();
  const { currentUser } = location.state || {};
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
      {loading ? <Loader /> : <AccessComponent currentUser={currentUser} />}
    </div>
  );
};

export default Access;
