import React, { useState } from 'react';
import { RegisterAPI, GoogleSignInAPI } from '../../../api/AuthApi';
import { postUserData } from '../../../api/FirestoreAPI';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import { toast } from 'react-toastify';
export default function RegisterComponent() {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({});
  const Register = async () => {
    try {
      let res = await RegisterAPI(credentials.email, credentials.password);
      toast.success('Check Email for Account Verification Link');
      postUserData({
        name: credentials.name,
        department: credentials.department,
        level: credentials.level,
        matricNumber: credentials.matricNumber,
        email: credentials.email,
        parentEmail: credentials.parentEmail,
        phone: credentials.phone,
        parentPhone: credentials.parentPhone,
        room: credentials.room,
        gender: credentials.gender,
      });
      navigate('/verify');
      localStorage.setItem('userEmail', res.user.email);
    } catch (err) {
      console.log(err);
      toast.error('Error creating account');
    }
  };
  const googleSignIn = () => {
    let response = GoogleSignInAPI();
    console.log(response);
    navigate('/passi');
  };
  return (
    <div className='w-[350px]   mx-auto mt-16 ' style={{ background: 'blue' }}>
      <div className=' flex flex-col items-center justify-between  '>
        <div className='flex flex-col items-center justify-between'>
          <h1 className='font-bold text-2xl'>Sign Up</h1>
          <div className='flex flex-col space-y-4'>
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
              className='name-input h-[40px] w-[250px] '
              placeholder='Enter your Full Name'
              type='text'
            />
            <select
              name='department'
              id='department'
              onChange={(e) =>
                setCredentials({ ...credentials, department: e.target.value })
              }>
              <option value='mps'>Mathematical and Physical Sciences</option>
              <option value='chemical science'>Chemical Sciences</option>
              <option value='biological science'>Biological Sciences</option>
            </select>
            <select
              name='level'
              id='level'
              onChange={(e) =>
                setCredentials({ ...credentials, level: e.target.value })
              }>
              <option value='100'>100</option>
              <option value='200'>200</option>
              <option value='300'>300</option>
              <option value='400'>400</option>
              <option value='500'>500</option>
            </select>
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, matricNumber: e.target.value })
              }
              className='name-input h-[40px] w-[250px]'
              placeholder='Enter your Matric Number'
              type='text'
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, email: e.target.value })
              }
              className='email-input h-[40px] w-[250px]'
              placeholder='Enter your email'
              type='email'
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, parentEmail: e.target.value })
              }
              className='email-input h-[40px] w-[250px]'
              placeholder="Enter your Parent's Email"
              type='email'
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, phone: e.target.value })
              }
              className='email-input h-[40px] w-[250px]'
              placeholder='Enter your phone'
              type='number'
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, parentPhone: e.target.value })
              }
              className='email-input h-[40px] w-[250px]'
              placeholder="Enter your Parent's Phone"
              type='number'
            />
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, room: e.target.value })
              }
              className='email-input h-[40px] w-[250px]'
              placeholder='Enter your Room Number'
              type='number'
            />
            <label htmlFor='gender'>
              <input
                type='radio'
                name='gender'
                id='male'
                value='male'
                onChange={(e) =>
                  setCredentials({ ...credentials, gender: e.target.value })
                }
              />
              Male
            </label>
            <label htmlFor='gender'>
              <input
                type='radio'
                name='gender'
                id='female'
                value='female'
                onChange={(e) =>
                  setCredentials({ ...credentials, gender: e.target.value })
                }
              />
              Female
            </label>
            <input
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              className='password-input  h-[40px] w-[250px]'
              placeholder='Password (6 Characters or more)'
              type='password'
            />
          </div>

          <button
            className='rounded w-[100px] h-[40px] bg-blue-700 text-white'
            style={{ cursor: 'pointer' }}
            onClick={Register}>
            Agree & Join
          </button>
          <Link to='/recover'>Forgot Password?</Link>
        </div>

        {/* <p className=' text-lg h-[5%]'>or</p> */}

        <div className='google-btn'>
          <GoogleButton type='dark' onClick={googleSignIn} />
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
  );
}
