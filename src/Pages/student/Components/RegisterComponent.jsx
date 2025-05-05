import React, { useState } from 'react'
import { RegisterAPI } from '../../../api/AuthApi'
import { postUserData } from '../../../api/FirestoreAPI'
import { Link, useNavigate } from 'react-router-dom'
import { getUniqueID } from '../../../helpers/getUniqueID'
import { toast } from 'react-toastify'
import logo from './../../../Images/logo.png'

// Reusable Input and Select Components
const InputField = ({ label, name, type, placeholder, onChange }) => (
  <div className='flex flex-col'>
    <label className='text-sm text-slate-400 mb-1'>{label}</label>
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      onChange={onChange}
      required
      className='bg-slate-50 text-slate-900 border border-slate-300 rounded px-4 py-2 placeholder:text-slate-500 outline-none focus:ring-2 focus:ring-blue-500'
    />
  </div>
)

const SelectField = ({ label, name, options, onChange }) => (
  <div className='flex flex-col'>
    <label className='text-sm text-slate-400 mb-1'>{label}</label>
    <select
      name={name}
      onChange={onChange}
      required
      className='bg-slate-50 text-slate-900 border border-slate-300 rounded px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500'
    >
      <option value=''>Select {label.toLowerCase()}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
)

// Main RegisterComponent
export default function RegisterComponent() {
  const navigate = useNavigate()
  const [credentials, setCredentials] = useState({
    name: '',
    matricNumber: '',
    department: '',
    course: '',
    room: '',
    email: '',
    level: '',
    gender: '',
    phone: '',
    parentPhone: '',
    parentEmail: '',
    password: '',
  })
  const [errors, setErrors] = useState({})

  const validateEmail = (email) => {
    // More robust email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return emailRegex.test(email)
  }

  const validateParentEmail = (parentEmail) => {
    // More robust email validation regex
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
    return emailRegex.test(parentEmail)
  }

  const validatePassword = (password) => {
    // Password must be at least 8 characters, contain letters and numbers, and allow special characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  }

  const departments = [
    'Mathematical and Physical Sciences',
    'Chemical Sciences',
    'Biological Sciences',
    'Accounting',
    'Business Administration',
    'Mass Communication',
    'Public Administration',
    'Banking and Finance',
    'Economics',
    'Law',
    'History and Diplomatic Studies',
    'Christian Religious Studies',
    'Languages',
    'Philosophy',
  ]

  const courses = [
    'Computer Science',
    'Biochemistry',
    'Mathematics',
    'Physics',
    'Chemistry',
    'Industrial Chemistry',
    'Microbiology',
    'Statistics',
    'English Language',
    'French',
    'History and Diplomatic Studies',
    'Religious Studies',
    'Philosophy',
    'Accounting',
    'Business Administration',
    'Public Administration',
    'Banking and Finance',
    'Economics',
    'Mass Communication',
    'Law',
  ]

  const levels = ['100l', '200l', '300l', '400l', '500l']
  const genders = ['Male', 'Female']

  const Register = async () => {
    // Reset errors
    setErrors({ email: '', password: '' })

    // Basic validation
    if (!validateEmail(credentials.email)) {
      setErrors((prev) => ({ ...prev, email: 'Invalid email address' }))
      toast.error('Please enter a valid email address')
      return
    }
    if (!validateParentEmail(credentials.parentEmail)) {
      setErrors((prev) => ({ ...prev, parentEmail: 'Invalid email address' }))
      toast.error('Please enter a valid parent email address')
      return
    }

    if (!validatePassword(credentials.password)) {
      setErrors((prev) => ({
        ...prev,
        password:
          'Password must be at least 8 characters long, include letters and numbers',
      }))
      toast.error('Password does not meet security requirements')
      return
    }
    try {
      let res = await RegisterAPI(credentials.email, credentials.password)
      toast.success('Check Email for Account Verification Link')
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
        course: credentials.course,
        stats: 'user',
        imageLink: logo,
        userImg: logo,
        userID: getUniqueID(),
      })
      navigate('/verify')
      localStorage.setItem('userEmail', res.user.email)
    } catch (err) {
      console.log(err)
      toast.error('Error creating account')
    }
  }

  return (
    <div className='min-h-screen py-24 px-4 md:px-10 bg-gray-900'>
      <div className='max-w-4xl mx-auto bg-slate-900 text-white  shadow-2xl'>
        <h1 className='text-4xl font-bold text-center uppercase mb-6 font-myfont'>
          Sign up here
        </h1>

        <form className='flex flex-col gap-6'>
          {/* Name and Matric Number */}
          <div className='grid md:grid-cols-2 gap-4'>
            <InputField
              label='Full name'
              name='name'
              type='text'
              placeholder='Input Name'
              onChange={(e) =>
                setCredentials({ ...credentials, name: e.target.value })
              }
            />
            <InputField
              label='Matric Number'
              name='matricNumber'
              type='text'
              placeholder='Input Matric Number'
              onChange={(e) =>
                setCredentials({ ...credentials, matricNumber: e.target.value })
              }
            />
          </div>

          {/* Department, Course, Room */}
          <div className='grid md:grid-cols-3 gap-4'>
            <SelectField
              label='Department'
              name='department'
              options={departments}
              onChange={(e) =>
                setCredentials({ ...credentials, department: e.target.value })
              }
            />
            <SelectField
              label='Course'
              name='course'
              options={courses}
              onChange={(e) =>
                setCredentials({ ...credentials, course: e.target.value })
              }
            />
            <InputField
              label='Room Number'
              name='room'
              type='number'
              placeholder='Room Number'
              onChange={(e) =>
                setCredentials({ ...credentials, room: e.target.value })
              }
            />
          </div>

          {/* Email and Level and Gender */}
          <div className='grid md:grid-cols-3 gap-4'>
            <div>
              <InputField
                label='Email Address'
                name='email'
                type='email'
                placeholder='Input Email'
                onChange={(e) =>
                  setCredentials({ ...credentials, email: e.target.value })
                }
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-500'>{errors.email}</p>
              )}
            </div>
            <SelectField
              label='Level'
              name='level'
              options={levels}
              onChange={(e) =>
                setCredentials({ ...credentials, level: e.target.value })
              }
            />
            <SelectField
              label='Gender'
              name='gender'
              options={genders}
              onChange={(e) =>
                setCredentials({ ...credentials, gender: e.target.value })
              }
            />
          </div>

          {/* Phone and Parent's Phone */}
          <div className='grid md:grid-cols-2 gap-4'>
            <InputField
              label='Phone'
              name='phone'
              type='tel'
              placeholder='Phone Number'
              onChange={(e) =>
                setCredentials({ ...credentials, phone: e.target.value })
              }
            />
            <InputField
              label="Parent's Phone"
              name='parentPhone'
              type='tel'
              placeholder='Parent Phone'
              onChange={(e) =>
                setCredentials({ ...credentials, parentPhone: e.target.value })
              }
            />
          </div>

          {/* Parent Email and Password */}
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <InputField
                label="Parent's Email"
                name='parentEmail'
                type='email'
                placeholder="Parent's Email"
                onChange={(e) =>
                  setCredentials({
                    ...credentials,
                    parentEmail: e.target.value,
                  })
                }
              />
              {errors.parentEmail && (
                <p className='mt-1 text-sm text-red-500'>
                  {errors.parentEmail}
                </p>
              )}
            </div>
            <div>
              <InputField
                label='Password'
                name='password'
                type='password'
                placeholder='Password'
                onChange={(e) =>
                  setCredentials({ ...credentials, password: e.target.value })
                }
              />
              {errors.password && (
                <p className='mt-1 text-sm text-red-500'>{errors.password}</p>
              )}
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={Register}
            type='button'
            className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition duration-200'
          >
            Register
          </button>

          <p className='text-center mt-4 text-sm text-slate-300'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-blue-400 underline hover:text-blue-500'
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
