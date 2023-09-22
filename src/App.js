import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/student/Login/Login';
import Register from './Pages/student/Login/Register';
import Passi from './Pages/student//Passi/Passi';
import NavBar from './Pages/student/Passi/NavBar';

import { app } from './firebaseConfig';
const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        <NavBar />
        <main>
          <Routes>
            <Route index element={<Home />} />
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='passi' element={<Passi />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
};

export default App;
