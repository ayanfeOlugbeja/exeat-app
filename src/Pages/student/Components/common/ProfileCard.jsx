import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  getSingleStatus,
  getSingleUser,
  getCurrentUser,
} from '../../../../api/FirestoreAPI'
import { uploadImage as uploadImageAPI } from '../../../../api/ImageUpload'
import FileUploadModal from '../fileUpload/FileUploadModal'
import { FiEdit2, FiMail, FiPhone, FiUser, FiHome } from 'react-icons/fi'
import { MdSchool, MdOutlineClass } from 'react-icons/md'
import { BsGenderAmbiguous } from 'react-icons/bs'
import { HiOutlineIdentification } from 'react-icons/hi'
import { AiOutlineNumber } from 'react-icons/ai'

export default function ProfileCard() {
  const location = useLocation()
  const [allStatuses, setAllStatus] = useState([])
  const [currentProfile, setCurrentProfile] = useState({})
  const [currentImage, setCurrentImage] = useState({})
  const [progress, setProgress] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
  const [currentUser, setCurrentUser] = useState({})
  const [activeTab, setActiveTab] = useState('personal')

  const getImage = (event) => {
    setCurrentImage(event.target.files[0])
  }

  const uploadImage = () => {
    uploadImageAPI(
      currentImage,
      currentUser.id,
      setModalOpen,
      setProgress,
      setCurrentImage
    )
  }

  useEffect(() => {
    if (location?.state?.id) {
      getSingleStatus(setAllStatus, location?.state?.id)
    }

    if (location?.state?.email) {
      getSingleUser(setCurrentProfile, location?.state?.email)
    }

    getCurrentUser(setCurrentUser)
  }, [location])

  // Determine which user data to display
  const userData =
    Object.keys(currentProfile).length === 0 ? currentUser : currentProfile

  // Define sections for better organization
  const profileSections = {
    personal: [
      { icon: <FiUser size={18} />, label: 'Name', value: userData.name },
      {
        icon: <BsGenderAmbiguous size={18} />,
        label: 'Gender',
        value: userData.gender,
      },
      { icon: <FiPhone size={18} />, label: 'Phone', value: userData.phone },
      { icon: <FiMail size={18} />, label: 'Email', value: userData.email },
    ],
    academic: [
      {
        icon: <MdSchool size={18} />,
        label: 'Department',
        value: userData.department,
      },
      {
        icon: <MdOutlineClass size={18} />,
        label: 'Level',
        value: userData.level,
      },
      {
        icon: <AiOutlineNumber size={18} />,
        label: 'Course',
        value: userData.course,
      },
      {
        icon: <HiOutlineIdentification size={18} />,
        label: 'Matric Number',
        value: userData.matricNumber,
      },
    ],
    emergency: [
      {
        icon: <FiPhone size={18} />,
        label: 'Parent Phone',
        value: userData.parentPhone,
      },
      {
        icon: <FiMail size={18} />,
        label: 'Parent Email',
        value: userData.parentEmail,
      },
      {
        icon: <FiHome size={18} />,
        label: 'Room Number',
        value: userData.room,
      },
    ],
  }

  return (
    <div className=' min-h-screen py-8'>
      <FileUploadModal
        getImage={getImage}
        uploadImage={uploadImage}
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        currentImage={currentImage}
        progress={progress}
      />

      <div className='max-w-4xl mx-auto px-4'>
        {/* Profile Header */}
        <div className=' overflow-hidden'>
          <div className='relative h-40 bg-gradient-to-r from-blue-500 to-indigo-600'>
            <div className='absolute -bottom-12 left-8'>
              <div className='relative'>
                <img
                  className='w-24 h-24 md:w-32 md:h-32  border-4  object-cover'
                  src={userData.imageLink || 'https://via.placeholder.com/150'}
                  alt='Profile'
                />
                <button
                  onClick={() => setModalOpen(true)}
                  className='absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 transition'
                >
                  <FiEdit2 size={16} className='text-blue-600' />
                </button>
              </div>
            </div>
          </div>

          <div className='pt-16 pb-6 px-8'>
            <div className='flex flex-col md:flex-row md:items-center md:justify-between'>
              <div>
                <h1 className='text-2xl font-bold text-gray-800'>
                  {userData.name || 'User Name'}
                </h1>
                <p className='text-gray-600'>
                  {userData.department || 'Department'} •{' '}
                  {userData.level || 'Level'}
                </p>
              </div>

              <div className='mt-4 md:mt-0'>
                <span className='bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium'>
                  Student
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className='mt-6  overflow-hidden '>
          {/* Tabs */}
          <div className='flex border-b'>
            {Object.keys(profileSections).map((section) => (
              <button
                key={section}
                className={`flex-1 py-4 px-6 text-center font-medium min-w-72 transition-colors duration-200 ${
                  activeTab === section
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className='p-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {profileSections[activeTab].map((item, idx) => (
                <div
                  key={idx}
                  className='flex items-center p-3  hover:bg-gray-50'
                >
                  <div className='flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 mr-4'>
                    {item.icon}
                  </div>
                  <div>
                    <p className='text-sm font-medium text-gray-500'>
                      {item.label}
                    </p>
                    <p className='text-base font-medium text-gray-900'>
                      {item.value || 'Not specified'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
