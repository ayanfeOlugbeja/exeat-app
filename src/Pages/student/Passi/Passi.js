import React, { useEffect, useState, useMemo } from 'react'
import { HomeAccordion } from './HomeAccordion'
import { onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { getCurrentUser } from '../../../api/FirestoreAPI'
import { auth } from '../../../firebaseConfig'
import Loader from '../Components/common/Loader'
import Admin from '../../admin/Admin'

const Passi = () => {
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
  useMemo(() => {
    getCurrentUser(setCurrentUser)
  }, [])
  if (currentUser.stats === 'admin') {
    return <Admin />
  } else if (currentUser.stats !== 'admin') {
    return (
      <div>
        {loading ? <Loader /> : <HomeAccordion currentUser={currentUser} />}
      </div>
    )
  }
}
export default Passi
