import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState, useMemo } from 'react';
import Home from './Pages/Home/Home';
import Login from './Pages/student/Login/Login';
import Register from './Pages/student/Login/Register';
import Passi from './Pages/student//Passi/Passi';
import NavBar from './Pages/student/Passi/NavBar';
import { app } from './firebaseConfig';
import Create from './Pages/student/Passi/create/Create';
import Access from './Pages/student/Passi/Access/Access';
import Profile from './Pages/student/Passi/profile/Profile';
import { getCurrentUser } from './api/FirestoreAPI';
// import { UserProvider } from './UserContext';
const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  useMemo(() => {
    getCurrentUser(setCurrentUser);
  }, []);
  return (
    // <UserProvider>
    <BrowserRouter>
      <div className='App'>
        <NavBar currentUser={currentUser} />
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='passi' element={<Passi />} />
            <Route path='passi/create' element={<Create />} />
            <Route path='passi/profile' element={<Profile />} />
            <Route path='passi/logs' element={<Access />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
    // </UserProvider>
  );
};

export default App;
