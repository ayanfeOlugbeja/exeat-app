import React, { useState, useEffect, useMemo } from 'react'
import SideBar from './SideBar'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebaseConfig'
import Loader from '../student/Components/common/Loader'
import { uploadImage as uploadImageAPI } from '../../api/ImageUpload'
import { getSingleStatus, getSingleUser } from '../../api/FirestoreAPI'
import FileUploadModal from '../student/Components/fileUpload/FileUploadModal'
import { useLocation } from 'react-router-dom'
import { HiOutlinePencil } from 'react-icons/hi'
import { getCurrentUser } from '../../api/FirestoreAPI'
import { AdminComponent } from './AdminComponent'
import Passi from '../student/Passi/Passi'
import { AdminAccordion } from './AdminAccordion'
function Admin() {
  let location = useLocation()
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState({})

  let navigate = useNavigate()
  useEffect(() => {
    onAuthStateChanged(auth, (res) => {
      if (!res?.accessToken) {
        navigate('/login')
      } else {
        setLoading(false)
      }
    })
  }, [])

  const [allStatuses, setAllStatus] = useState([])
  const [currentProfile, setCurrentProfile] = useState({})
  const [currentImage, setCurrentImage] = useState({})
  const [progress, setProgress] = useState(0)
  const [modalOpen, setModalOpen] = useState(false)
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

  if (currentUser.stats === 'user') {
    return <Passi />
  } else if (currentUser.stats !== 'passi') {
    return (
      <>
        {loading ? (
          <Loader />
        ) : (
          <div>
            <AdminComponent currentUser={currentUser}/>
          </div>
        )}
      </>
    )
  }
}

export default Admin
