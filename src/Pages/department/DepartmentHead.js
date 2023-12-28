import React, { useState, useEffect } from 'react';
import SideBar from '../admin/SideBar';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import Loader from '../student/Components/common/Loader';
// import ExeatCard from './Components/ExeatCard';
function DepartmentHead({ currentUser }) {
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
        <div>
          <SideBar currentUser={currentUser} />
        </div>
      )}
    </div>
  );
}

export default DepartmentHead;
