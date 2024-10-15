import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';
import { LoginAPI } from '../../../api/AuthApi';
import { toast } from 'react-toastify';

export default function LoginComponent() {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  // const [errors, setErrors] = useState({ email: '', password: '' });

  // const validateEmail = (email) => {
  //   // More robust email validation regex
  //   const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  //   return emailRegex.test(email);
  // };

  // const validatePassword = (password) => {
  //   // Password must be at least 8 characters, contain letters and numbers, and allow special characters
  //   const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
  //   return passwordRegex.test(password);
  // };

  const handleLogin = async () => {
    // // Reset errors
    // setErrors({ email: '', password: '' });

    // // Basic validation
    // if (!validateEmail(credentials.email)) {
    //   setErrors((prev) => ({ ...prev, email: 'Invalid email address' }));
    //   toast.error('Please enter a valid email address');
    //   return;
    // }

    // if (!validatePassword(credentials.password)) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     password:
    //       'Password must be at least 8 characters long, include letters and numbers',
    //   }));
    //   toast.error('Password does not meet security requirements');
    //   return;
    // }

    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success('Signed in to PASSI');
      localStorage.setItem('userEmail', res.user.email);
      navigate('/passi');
    } catch (err) {
      toast.error('Invalid credentials, please try again');
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-900 text-white'>
      <div className='w-full max-w-md p-8 space-y-8 bg-gray-800 rounded-lg shadow-lg'>
        <h1 className='text-4xl font-bold text-center text-yellow-400'>
          Welcome Back!
        </h1>

        {/* Form */}
        <form className='mt-8 space-y-6' action='#' method='POST'>
          {/* Email Input */}
          <div className='relative'>
            <label className='text-sm font-semibold' htmlFor='email'>
              <AiOutlineMail className='inline-block mr-2' /> Email
            </label>
            <input
              id='email'
              name='email'
              type='email'
              placeholder='youremail@example.com'
              className='w-full p-3 mt-1 rounded-lg bg-gray-700 border border-transparent focus:border-yellow-400 focus:bg-gray-600 focus:outline-none text-gray-200'
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              value={credentials.email}
            />
          </div>

          {/* Password Input */}
          <div className='relative'>
            <label className='text-sm font-semibold' htmlFor='password'>
              <RiLockPasswordFill className='inline-block mr-2' /> Password
            </label>
            <input
              id='password'
              name='password'
              type='password'
              placeholder='********'
              className='w-full p-3 mt-1 rounded-lg bg-gray-700 border border-transparent focus:border-yellow-400 focus:bg-gray-600 focus:outline-none text-gray-200'
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              value={credentials.password}
            />
          </div>

          {/* Login Button */}
          <button
            type='button'
            onClick={handleLogin}
            className='w-full py-3 mt-4 text-white bg-yellow-400 rounded-lg shadow-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-50 transition duration-300 transform hover:scale-105'>
            Login
          </button>
        </form>

        {/* Forgot Password */}
        <div className='text-sm text-center'>
          <Link to='/recover' className='text-yellow-400 hover:text-yellow-500'>
            Forgot your password?
          </Link>
        </div>

        {/* Sign Up */}
        <p className='text-center text-sm'>
          Don't have an account?{' '}
          <Link
            to='/register'
            className='text-yellow-400 hover:text-yellow-500'>
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
