import React, { useEffect, useState } from 'react';
import StudentsComponent from './StudentsComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../../firebaseConfig';
import Loader from '../../student/Components/common/Loader';
import SideBar from '../SideBar';
export default function StudentList({ currentUser }) {
  const [loading, setLoading] = useState(true);
  let navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate('/');
      } else {
        setLoading(false);
      }
    });
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <>
      <SideBar />
      <StudentsComponent currentUser={currentUser} />
    </>
  );
}
