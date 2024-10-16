import React, { useState, useMemo } from 'react';
import {
  getSingleStatus,
  getSingleUser,
  getCurrentUser,
} from '../../../../api/FirestoreAPI';
import { useLocation } from 'react-router-dom';
import FileUploadModal from '../fileUpload/FileUploadModal';
import { uploadImage as uploadImageAPI } from '../../../../api/ImageUpload';

export default function ProfileCard() {
  let location = useLocation();
  const [allStatuses, setAllStatus] = useState([]);
  const [currentProfile, setCurrentProfile] = useState({});
  const [currentImage, setCurrentImage] = useState({});
  const [progress, setProgress] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const getImage = (event) => {
    setCurrentImage(event.target.files[0]);
  };

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
  }, [location]);

  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);

  return (
    <div className='flex justify-center py-10 items-center'>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />

      <div className='p-6 bg-white shadow-lg rounded-lg w-full max-w-4xl'>
        <div className='flex flex-col items-center md:flex-row md:items-start gap-8'>
          {/* Profile Picture */}
          <div className='flex flex-col items-center text-center md:items-start md:text-left'>
            <img
              className='w-36 h-36 rounded-full shadow-md object-cover'
              src={
                Object.keys(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt='Profile'
            />
            <button
              className='mt-3 text-blue-600 hover:text-blue-800 font-semibold'
              onClick={() => setModalOpen(true)}>
              Upload Profile Picture
            </button>
          </div>

          {/* Profile Information */}
          <div className='flex flex-col gap-5 text-gray-700'>
            <h1 className='text-2xl font-bold uppercase'>My Profile</h1>

            {[
              { label: 'Name', value: currentUser.name },
              { label: 'Department', value: currentUser.department },
              { label: 'Course', value: currentUser.course },
              { label: 'Matric Number', value: currentUser.matricNumber },
              { label: 'Phone', value: currentUser.phone },
              { label: 'Parent Phone', value: currentUser.parentPhone },
              { label: 'Email', value: currentUser.email },
              { label: 'Parent Email', value: currentUser.parentEmail },
              { label: 'Room Number', value: currentUser.room },
              { label: 'Level', value: currentUser.level },
              { label: 'Gender', value: currentUser.gender },
            ].map((item, idx) => (
              <div key={idx} className='flex flex-row gap-3'>
                <span className='font-semibold text-lg'>{item.label}:</span>
                <span className='text-base'>{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
