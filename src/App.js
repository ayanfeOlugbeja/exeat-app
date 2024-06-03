import { BrowserRouter, Routes, Route } from 'react-router-dom'

import React, { useState, useMemo, lazy, Suspense } from 'react'
import Home from './Pages/Home/Home'
import Login from './Pages/student/Login/Login'
import Register from './Pages/student/Login/Register'

import EmailVerification from './Pages/student/Login/EmailVerification'
import ForgotPassword from './Pages/student/Components/ForgotPassword'
import NavBar from './Pages/student/Passi/NavBar'
// import { app } from './firebaseConfig';
import Create from './Pages/student/Passi/create/Create'
import Access from './Pages/student/Passi/Access/Access'
import About from './Pages/Profile/Profile'
import { getCurrentUser } from './api/FirestoreAPI'
import Document from './Pages/admin/Components/Document/Document'
import DepartmentDocument from './Pages/department/Components/Documents/DepartmentDocument'
import NotFound from './NotFound'

import Loader from './Pages/student/Components/common/Loader'

const Passi = lazy(() => import('./Pages/student/Passi/Passi'))
const Admin = lazy(() => import('./Pages/admin/Admin'))
const Profile = lazy(() => import('./Pages/student/Passi/profile/Profile'))
const DepartmentHead = lazy(() => import('./Pages/department/DepartmentHead'))
// import { UserProvider } from './UserContext';
const App = () => {
  const [currentUser, setCurrentUser] = useState({})
  useMemo(() => {
    getCurrentUser(setCurrentUser)
  }, [])
  return (
    // <UserProvider>
    <Suspense fallback={<Loader />}>
      <BrowserRouter>
        <div className='App'>
          {/* <NavBar currentUser={currentUser} /> */}
          <main>
            <Routes>
              <Route index element={<Home />} />
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='passi' element={<Passi />} />
              <Route path='passi/create' element={<Create />} />
              <Route
                path='passi/profile'
                element={<Profile currentUser={currentUser} />}
              />
              <Route path='passi/logs' element={<Access />} />
              <Route path='recover' element={<ForgotPassword />} />
              <Route path='verify' element={<EmailVerification />} />
              <Route
                path='admin'
                element={<Admin currentUser={currentUser} />}
              />
              <Route path='profile' element={<About />} />

              <Route
                path='department'
                element={<DepartmentHead currentUser={currentUser} />}
              />

              <Route
                path='admin/docs'
                element={<Document currentUser={currentUser} />}
              />

              <Route
                path='department/docs'
                element={<DepartmentDocument currentUser={currentUser} />}
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </Suspense>
    // </UserProvider>
  )
}

export default App
