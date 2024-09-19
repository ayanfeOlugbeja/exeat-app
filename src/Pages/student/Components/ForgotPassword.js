import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import logo from '../../../Images/logo.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');

  const onChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success('Email was sent');
    } catch (error) {
      toast.error('Could not send reset password');
    }
  };

  return (
    <section className='bg-gradient-to-b from-blue-800 to-blue-600 min-h-screen flex flex-col justify-center items-center p-6'>
      <div className='bg-white rounded-lg shadow-lg p-8 max-w-md w-full'>
        <img src={logo} alt='logo' className='w-24 mx-auto mb-6' />
        <h1 className='text-2xl text-center font-semibold text-gray-800 mb-4'>
          Forgot Password
        </h1>
        <form onSubmit={onSubmit}>
          <input
            type='email'
            id='email'
            value={email}
            onChange={onChange}
            placeholder='Email address'
            className='mb-4 w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
            required
          />
          <div className='flex justify-between items-center mb-6'>
            <p className='text-sm text-gray-600'>
              Don't have an account?
              <Link
                to='/register'
                className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out ml-1'>
                Register
              </Link>
            </p>
            <p>
              <Link
                to='/login'
                className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>
                Sign in instead
              </Link>
            </p>
          </div>
          <button
            className='w-full bg-blue-600 text-white px-4 py-2 rounded-md font-semibold transition duration-150 ease-in-out hover:bg-blue-700 active:bg-blue-800'
            type='submit'>
            Send reset password
          </button>
        </form>
      </div>
    </section>
  );
}
