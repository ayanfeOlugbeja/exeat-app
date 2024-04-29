import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { AiOutlineMail } from 'react-icons/ai';
import { RiLockPasswordFill } from 'react-icons/ri';

import { LoginAPI } from '../../../api/AuthApi';
import { toast } from 'react-toastify';
export default function LoginComponent() {
  const navig = useNavigate();

  const [credentials, setCredentials] = useState({});
  const login = async () => {
    try {
      let res = await LoginAPI(credentials.email, credentials.password);
      toast.success('Signed in to PASSI');
      localStorage.setItem('userEmail', res.user.email);
      navig('/passi');
    } catch (err) {
      toast.error('Check your credentials');
    }
  };

  return (
    <>
      <div className='py-[150px] px-[20px]  '>
        <div className='flex flex-row justify-center'>
          <div
            data-aos='zoom-in'
            className='bg-slate-900 md:px-[70px]  flex flex-col  p-[20px] rounded shadow-2xl'>
            <div>
              <h1 className='text-center text-slate-50 font-semibold text-[20px] uppercase font-myfont    mb-3'>
                Welcome back!
              </h1>
            </div>
            <form action='' className='flex  flex-col gap-5'>
              <div className='flex flex-col gap-1 items-start'>
                <label
                  htmlFor='email'
                  className='flex  items-center gap-1 text-slate-50 text-[15px]'>
                  <AiOutlineMail />
                  Email:
                </label>
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, email: e.target.value })
                  }
                  value={credentials.emailAddress}
                  type='email'
                  placeholder='aiyedogbon@gmail.com'
                  className='p-3 text shadow bg-slate-50 text-slate-900 rounded w-full outline-0 '
                />
              </div>
              <div className='flex flex-col gap-1 items-start'>
                <label
                  htmlFor='password'
                  className='flex gap-1 items-center text-slate-50 text-[15px] '>
                  <RiLockPasswordFill />
                  Password
                </label>
                <input
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  value={credentials.password}
                  type='password'
                  placeholder='******'
                  className='p-3 rounded bg-slate-50 text-slate-900 outline-0 w-full shadow '
                />
              </div>
              <button
                onClick={login}
                type='button'
                className='bg-yellow-500 hover:bg-yellow-700 text-slate-50 rounded text-[17px] font-semibold p-3'>
                Login
              </button>

              <Link
                to='/recover'
                className='text-slate-200 hover:text-slate-500 text-[13px] font-300'>
                Forgot Password?
              </Link>
              <p className='text-center text-[17px] text-slate-100 '>
                Don't have account yet?{' '}
                <Link to='/register' className='text-yellow-500 text-[15px]'>
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
