import React, { useState, useMemo } from 'react';
import { getSingleStatus, getSingleUser } from '../../../../api/FirestoreAPI';
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
    // <div className='flex flex-col justify-center items-center p-5 mt-10 space-y-5 w-[500px] mx-auto'>

    //   <div className='profile-card'>
    //     {currentUser.id === location?.state?.id ? (
    //       <div className='edit-btn'>
    //         <HiOutlinePencil className='edit-icon' onClick={onEdit} size={25} />
    //       </div>
    //     ) : (
    //       <></>
    //     )}
    //     <div className='profile-info '>
    //       <div className='space-y-3 font-semibold p-3'>
    //         <img
    //           className='profile-image w-[200px] h-[200px] mx-auto'
    //           onClick={() => setModalOpen(true)}
    //           src={
    //             Object.values(currentProfile).length === 0
    //               ? currentUser.imageLink
    //               : currentProfile?.imageLink
    //           }
    //           alt='your-pic'
    //         />
    //         <h3 className='userName'>
    //           Full Name -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.name
    //             : currentProfile?.name}
    //         </h3>
    //         <h3 className='matricNumber'>
    //           Matriculation Number -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.matricNumber
    //             : currentProfile?.matricNumber}
    //         </h3>
    //         <h3 className='Email'>
    //           Email -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.email
    //             : currentProfile?.email}
    //         </h3>
    //         <h3 className='parentEmail'>
    //           Parent Email -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.parentEmail
    //             : currentProfile?.parentEmail}
    //         </h3>
    //         <h3 className='Phone'>
    //           Phone -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.phone
    //             : currentProfile?.phone}
    //         </h3>
    //         <h3 className='parentPhone'>
    //           Parent Phone -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.parentPhone
    //             : currentProfile?.parentPhone}
    //         </h3>
    //         <h3 className='room'>
    //           Room Number -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.room
    //             : currentProfile?.room}
    //         </h3>

    //         <h3 className='gender'>
    //           {' '}
    //           Gender -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.gender
    //             : currentProfile?.gender}
    //         </h3>
    //         <h3 className='level'>
    //           {' '}
    //           Level -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.level
    //             : currentProfile?.level}
    //         </h3>
    //         <h3 className='department'>
    //           {' '}
    //           Department -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.department
    //             : currentProfile?.department}
    //         </h3>
    //         <p className='course'>
    //           Course -
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.course
    //             : currentProfile?.course}
    //         </p>
    //         {(currentUser.city || currentUser.country) &&
    //         (currentProfile?.city || currentProfile?.country) ? (
    //           <p className='location'>
    //             {Object.values(currentProfile).length === 0
    //               ? `${currentUser.city}, ${currentUser.country} `
    //               : `${currentProfile?.city}, ${currentUser.country}`}
    //           </p>
    //         ) : (
    //           <></>
    //         )}
    //         {currentUser.website || currentProfile?.website ? (
    //           <a
    //             className='website'
    //             target='_blank'
    //             href={
    //               Object.values(currentProfile).length === 0
    //                 ? `${currentUser.website}`
    //                 : currentProfile?.website
    //             }>
    //             {Object.values(currentProfile).length === 0
    //               ? `${currentUser.website}`
    //               : currentProfile?.website}
    //           </a>
    //         ) : (
    //           <></>
    //         )}
    //       </div>

    //       <div className='right-info'>
    //         <p className='college'>
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.college
    //             : currentProfile?.college}
    //         </p>
    //         <p className='company'>
    //           {Object.values(currentProfile).length === 0
    //             ? currentUser.company
    //             : currentProfile?.company}
    //         </p>
    //       </div>
    //     </div>
    //     <p className='about-me'>
    //       {Object.values(currentProfile).length === 0
    //         ? currentUser.aboutMe
    //         : currentProfile?.aboutMe}
    //     </p>

    //     {currentUser.skills || currentProfile?.skills ? (
    //       <p className='skills'>
    //         <span className='skill-label'>Skills</span>:&nbsp;
    //         {Object.values(currentProfile).length === 0
    //           ? currentUser.skills
    //           : currentProfile?.skills}
    //       </p>
    //     ) : (
    //       <></>
    //     )}
    //   </div>
    //   {/* <div className='post-status-main'>
    //     {allStatuses?.map((posts) => {
    //       return (
    //         <div key={posts.id}>
    //           <Access posts={posts} />
    //         </div>
    //       );
    //     })}
    //   </div> */}
    // </div>

    <div className='flex justify-center pt-[150px] flex-row py-[50px] items-center '>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />
      <div className=' p-5 rounded '>
        <div className='flex flex-col items-start md:items-start md:flex-row gap-5 md:gap-[150px]'>
          <div className='flex flex-col items-center '>
            <img
              className='w-[150px] shadow-2xl h-[150px] rounded-full'
              src={
                Object.values(currentProfile).length === 0
                  ? currentUser.imageLink
                  : currentProfile?.imageLink
              }
              alt='upload-your-pic'
            />
            <p className='text-blue-500' onClick={() => setModalOpen(true)}>
              Upload Profile Picture
            </p>
            {/* <div className='flex flex-col justify-center items-center'>
              <input
                onChange={(e) => setProfileImg(e.target.files[0])}
                type='file'
                accept='image/*'
                className='file:bg-transparent font-semibold py-[10px]  text-[15px] file:border-0 max-w-[200px]'
                name=''
                id=''
              />
              <button
                onClick={() => updateProfilePic(uid)}
                className='flex items-start text-center text-slate-50 gap-2 md:text-[15px] font-semibold bg-black text-[12px]  p-2 h-fit rounded '>
                Update profile picture
              </button>
            </div> */}
          </div>

          <div className='flex flex-col text-start md:text-start gap-[15px] '>
            <h1 className='uppercase font-myfont  text-[25px] font-bold'>
              My Profile
            </h1>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Name:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.name}
              </span>
            </p>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Department:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.department}
              </span>
            </p>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Course:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.course}
              </span>
            </p>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Matric Number:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.matricNumber}
              </span>
            </p>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Phone:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.phone}
              </span>
            </p>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Parent Phone:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.parentPhone}
              </span>
            </p>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Email:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.email}
              </span>
            </p>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Parent Email:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.parentEmail}
              </span>
            </p>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Room Number:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.room}
              </span>
            </p>

            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px] font-bold '>
                Level:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.level}
              </span>
            </p>
            <p className='flex flex-row items-center gap-5'>
              <span className='md:text-[20px] text-[15px]  font-bold '>
                Gender:
              </span>{' '}
              <span className='text-slate-700 text-[12px] md:text-[15px] '>
                {currentUser.gender}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
