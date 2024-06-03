import React, { useState, useMemo } from 'react'
import {
  getSingleStatus,
  getSingleUser,
  getCurrentUser,
} from '../../../../api/FirestoreAPI'
import { useLocation } from 'react-router-dom'
import FileUploadModal from '../fileUpload/FileUploadModal'
import { uploadImage as uploadImageAPI } from '../../../../api/ImageUpload'

export default function ProfileCard() {
  let location = useLocation()
  const [allStatuses, setAllStatus] = useState([])
  const [currentProfile, setCurrentProfile] = useState({})
  const [currentImage, setCurrentImage] = useState({})
  const [progress, setProgress] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const getImage = (event) => {
    setCurrentImage(event.target.files[0])
  }
  // console.log(currentProfile);
  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    )
  }

  useMemo(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id)
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email)
    }
  }, [])
  useMemo(() => {
    getCurrentUser(setCurrentUser)
  }, [])

  return (
    <div className='flex justify-center flex-row py-[50px] items-center '>
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
  )
}
