import React, { useState, useEffect, useMemo } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import Loader from '../student/Components/common/Loader';
import { getSingleStatus, getSingleUser } from '../../api/FirestoreAPI';
import { useLocation } from 'react-router-dom';
import { HiOutlinePencil } from 'react-icons/hi';
import { DepartmentComponent } from './DepartmentComponent';
import Passi from '../student/Passi/Passi';
import Admin from '../admin/Admin';
import { getCurrentUser } from '../../api/FirestoreAPI';
function DepartmentHead() {
  let location = useLocation();
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

  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  // console.log(currentProfile);

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  console.log(currentUser.stats, 'departmentHead');

  if (currentUser.stats === 'user') {
    return <Passi />;
  } else if (currentUser.stats === 'admin') {
    return <Admin />;
  } else {
    return (
      <div className='pl-[80px] h-[100vh] flex items-center'>
        {loading ? <Loader /> : <DepartmentComponent />}
      </div>
    );
  }
}

export default DepartmentHead;
