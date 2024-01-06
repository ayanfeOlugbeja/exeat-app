import React, { useState, useEffect, useMemo } from 'react';
import SideBar from '../admin/SideBar';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConfig';
import Loader from '../student/Components/common/Loader';
import { uploadImage as uploadImageAPI } from '../../api/ImageUpload';
import { getSingleStatus, getSingleUser } from '../../api/FirestoreAPI';
import FileUploadModal from '../student/Components/fileUpload/FileUploadModal';
import { useLocation } from 'react-router-dom';
import { HiOutlinePencil } from 'react-icons/hi';
function DepartmentHead({ currentUser }) {
  let location = useLocation();
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

  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };
  // console.log(currentProfile);
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    );
  };

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id);
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email);
    }
  }, []);

  return (
    <div className='pl-[80px] h-[100vh] flex items-center'>
      {loading ? (
        <Loader />
      ) : (
        <div>
          <FileUploadModal
            getImage={getImage}
            uploadImage={uploadImage}
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            currentImage={currentImage}
            progress={progress}
          />
          <div className='profile-card p-10'>
            <img
              className='profile-image w-[250px] h-[250px] mx-auto rounded-lg'
              onClick={() => setModalOpen(true)}
              style={{ border: '2px solid black' }}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt='your-pic'
            />
            <h3 className='department'>
              Department of
              {Object.values(currentProfile).length === 0
                ? currentUser.department
                : currentProfile?.department}
            </h3>
          </div>
          <SideBar currentUser={currentUser} />
        </div>
      )}
    </div>
  );
}

export default DepartmentHead;
