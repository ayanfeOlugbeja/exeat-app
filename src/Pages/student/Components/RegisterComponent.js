import React, { useState } from 'react';
import { RegisterAPI, GoogleSignInAPI } from '../../../api/AuthApi';
import { postUserData } from '../../../api/FirestoreAPI';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { toast } from 'react-toastify';
export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const Register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success('Account created');
      postUserData({
        name: credentials.name,
        matricNumber: credentials.matricNumber,
        email: credentials.email,
      });
      navigate('/login');
      localStorage.setItem('userEmail', res.user.email);
    } catch (err) {
      toast.error('Error creating account');
    }
  };
  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    console.log(response);
    navigate('/passi');
  };
  return (
    <div className='w-[350px] h-[100vh]  mx-auto mt-16'>
      <div
        className='h-[90vh] flex flex-col items-center justify-between space-y-14 p-4 '
        style={{
          border: '1px solid white',
          background: 'black',
          color: 'white',
        }}>
        <div
          className='flex flex-col items-center justify-between h-[70%] py-8 w-[95%]'
          style={{ border: '1px solid white' }}>
          <h1 className='font-bold text-2xl'>Sign Up</h1>
          <div className='flex flex-col space-y-4'>
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
              className='name-input h-[40px] w-[250px]'
              placeholder='Enter your Full Name'
              style={{
                border: '1px solid white',
                outlineColor: 'white',
                color: 'black',
              }}
              type='text'
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, matricNumber: e.target.value })
              }
              className='name-input h-[40px] w-[250px]'
              placeholder='Enter your Matric Number'
              style={{
                border: '1px solid white',
                outlineColor: 'white',
                color: 'black',
              }}
              type='text'
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className='email-input h-[40px] w-[250px]'
              placeholder='Enter your email'
              style={{
                border: '1px solid white',
                outlineColor: 'white',
                color: 'black',
              }}
              type='email'
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className='password-input  h-[40px] w-[250px]'
              placeholder='Password (6 Characters or more)'
              style={{
                border: '1px solid white',
                outlineColor: 'white',
                color: 'black',
              }}
              type='password'
            />
          </div>

          <button
            className='rounded w-[100px] h-[40px] bg-blue-700 text-white'
            style={{ cursor: 'pointer' }}
            onClick={Register}>
            Agree & Join
          </button>
        </div>

        {/* <p className=' text-lg h-[5%]'>or</p> */}

        <div
          className='flex flex-col items-center justify-between h-[30%] p-4'
          style={{ border: '1px solid white' }}>
          <div className='google-btn'>
            <GoogleButton type='light' onClick={googleSignIn} />
          </div>
          <p>
            Already on PASSI?{' '}
            <span
              className='text-blue-500 text-base cursor-pointer'
              onClick={() => navigate('/login')}>
              Sign In
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
