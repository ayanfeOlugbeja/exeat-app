import React, { useState } from 'react';
import { LoginAPI, GoogleSignInAPI } from '../../../api/AuthApi';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { toast } from 'react-toastify';
export default function LoginComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success('Signed in to PASSI');
      localStorage.setItem('userEmail', res.user.email);
      navigate('/passi');
    } catch (err) {
      toast.error('Check your credentials');
    }
  };
  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    console.log(response);
    navigate('/passi');
  };
  return (
    <div className='w-[350px] h-[100vh]  mx-auto mt-24'>
      <div
        className='h-[80%] flex flex-col items-center justify-between space-y-14 p-4 
    '
        style={{ border: '1px solid black' }}>
        <div
          className='flex flex-col items-center justify-between h-[70%] py-8 w-[90%]'
          style={{ border: '1px solid black' }}>
          <h1 className='font-bold text-2xl'>Sign In</h1>
          <div className='flex flex-col space-y-4'>
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className='email-input h-[40px] w-[250px]'
              placeholder='Enter your email'
              style={{ border: '1px solid black' }}
              type='email'
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className='password-input  h-[40px] w-[250px]'
              placeholder='Enter your password'
              style={{ border: '1px solid black' }}
              type='password'
            />
          </div>

          <button
            className='rounded w-[100px] h-[40px] bg-black text-white'
            style={{ cursor: 'pointer' }}
            onClick={login}>
            Sign in
          </button>
        </div>

        <div
          className='flex flex-col items-center justify-between h-[30%] p-4'
          style={{ border: '1px solid black' }}>
          <div className='google-btn'>
            <GoogleButton
              className='bg-black text-white'
              type='dark'
              onClick={googleSignIn}
            />
          </div>
          <p>
            New to PASSI?{' '}
            <span
              className='text-blue-500 text-base cursor-pointer'
              onClick={() => navigate('/register')}>
              Join Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
