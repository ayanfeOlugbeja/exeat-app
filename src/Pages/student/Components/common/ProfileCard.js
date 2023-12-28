import React, { useState, useMemo } from 'react';
import { getSingleStatus, getSingleUser } from '../../../../api/FirestoreAPI';
import { HiOutlinePencil } from 'react-icons/hi';
import { AiOutlineClose } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import FileUploadModal from '../fileUpload/FileUploadModal';
import { uploadImage as uploadImageAPI } from '../../../../api/ImageUpload';

export default function ProfileCard({ onEdit, currentUser }) {
  let location = useLocation();
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
    <div className='flex flex-col justify-center items-center p-5 mt-10 space-y-5 w-[500px] mx-auto'>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className='profile-card'>
        {currentUser.id === location?.state?.id ? (
          <div className='edit-btn'>
            <HiOutlinePencil className='edit-icon' onClick={onEdit} size={25} />
          </div>
        ) : (
          <></>
        )}
        <div className='profile-info '>
          <div className='space-y-3 font-semibold p-3'>
            <img
              className='profile-image w-[200px] h-[200px] mx-auto'
              onClick={() => setModalOpen(true)}
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt='your-pic'
            />
            <h3 className='userName'>
              Full Name -
              {Object.values(currentProfile).length === 0
                ? currentUser.name
                : currentProfile?.name}
            </h3>
            <h3 className='matricNumber'>
              Matriculation Number -
              {Object.values(currentProfile).length === 0
                ? currentUser.matricNumber
                : currentProfile?.matricNumber}
            </h3>
            <h3 className='Email'>
              Email -
              {Object.values(currentProfile).length === 0
                ? currentUser.email
                : currentProfile?.email}
            </h3>
            <h3 className='parentEmail'>
              Parent Email -
              {Object.values(currentProfile).length === 0
                ? currentUser.parentEmail
                : currentProfile?.parentEmail}
            </h3>
            <h3 className='Phone'>
              Phone -
              {Object.values(currentProfile).length === 0
                ? currentUser.phone
                : currentProfile?.phone}
            </h3>
            <h3 className='parentPhone'>
              Parent Phone -
              {Object.values(currentProfile).length === 0
                ? currentUser.parentPhone
                : currentProfile?.parentPhone}
            </h3>
            <h3 className='room'>
              Room Number -
              {Object.values(currentProfile).length === 0
                ? currentUser.room
                : currentProfile?.room}
            </h3>

            <h3 className='gender'>
              {' '}
              Gender -
              {Object.values(currentProfile).length === 0
                ? currentUser.gender
                : currentProfile?.gender}
            </h3>
            <h3 className='level'>
              {' '}
              Level -
              {Object.values(currentProfile).length === 0
                ? currentUser.level
                : currentProfile?.level}
            </h3>
            <h3 className='department'>
              {' '}
              Department -
              {Object.values(currentProfile).length === 0
                ? currentUser.department
                : currentProfile?.department}
            </h3>
            <p className='heading'>
              {Object.values(currentProfile).length === 0
                ? currentUser.headline
                : currentProfile?.headline}
            </p>
            {(currentUser.city || currentUser.country) &&
            (currentProfile?.city || currentProfile?.country) ? (
              <p className='location'>
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.city}, ${currentUser.country} `
                  : `${currentProfile?.city}, ${currentUser.country}`}
              </p>
            ) : (
              <></>
            )}
            {currentUser.website || currentProfile?.website ? (
              <a
                className='website'
                target='_blank'
                href={
                  Object.values(currentProfile).length === 0
                    ? `${currentUser.website}`
                    : currentProfile?.website
                }>
                {Object.values(currentProfile).length === 0
                  ? `${currentUser.website}`
                  : currentProfile?.website}
              </a>
            ) : (
              <></>
            )}
          </div>

          <div className='right-info'>
            <p className='college'>
              {Object.values(currentProfile).length === 0
                ? currentUser.college
                : currentProfile?.college}
            </p>
            <p className='company'>
              {Object.values(currentProfile).length === 0
                ? currentUser.company
                : currentProfile?.company}
            </p>
          </div>
        </div>
        <p className='about-me'>
          {Object.values(currentProfile).length === 0
            ? currentUser.aboutMe
            : currentProfile?.aboutMe}
        </p>

        {currentUser.skills || currentProfile?.skills ? (
          <p className='skills'>
            <span className='skill-label'>Skills</span>:&nbsp;
            {Object.values(currentProfile).length === 0
              ? currentUser.skills
              : currentProfile?.skills}
          </p>
        ) : (
          <></>
        )}
      </div>
      {/* <div className='post-status-main'>
        {allStatuses?.map((posts) => {
          return (
            <div key={posts.id}>
              <Access posts={posts} />
            </div>
          );
        })} 
      </div> */}
    </div>
  );
}
