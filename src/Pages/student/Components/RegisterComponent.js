import React, { useState } from 'react'
import { RegisterAPI } from '../../../api/AuthApi'
import { postUserData } from '../../../api/FirestoreAPI'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getUniqueID } from '../../../helpers/getUniqueID'
import { toast } from 'react-toastify'
import logo from './../../../Images/logo.png'
export default function RegisterComponent() {
  let navigate = useNavigate()
  const [credentials, setCredentials] = useState({})
  const Register = async () => {
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
    <div className='py-[70px] px-[20px] pt-[150px]'>
      <div className='flex flex-row justify-center'>
        <div
          data-aos='zoom-in'
          className='bg-slate-900 shadow-2xl md:px-[70px]  flex flex-col  p-[20px] rounded'
        >
          <h1 className='text-center text-slate-50 font-semibold text-[20px] uppercase font-myfont    mb-3'>
            Sign up here
          </h1>

          {
            <form
              action=''
              className='flex  my-5  p-5 rounded flex-col gap-[20px]'
            >
              <div>
                <div className='flex  flex-col gap-[10px] '>
                  <div className='flex flex-col md:flex-row gap-5'>
                    <div className='flex flex-col '>
                      <label
                        className='text-[17px] text-slate-400 font-[400]'
                        htmlFor=''
                      >
                        Full name:
                      </label>
                      <input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            name: e.target.value,
                          })
                        }
                        placeholder='Input Name'
                        className=' bg-slate-50 text-slate-900 w-full border-[2px]  rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                        type='text'
                        name='name'
                        id='name'
                        required
                      />
                    </div>
                    <div className='flex flex-col '>
                      <label
                        className='text-[17px] text-slate-400 font-[400]'
                        htmlFor=''
                      >
                        Matric Number:
                      </label>
                      <input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            matricNumber: e.target.value,
                          })
                        }
                        placeholder='Input Matric Number'
                        className=' bg-slate-50 text-slate-900 w-full border-[2px]  rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                        type='text'
                        name='matricNumber'
                        id='matric'
                        required
                      />
                    </div>
                  </div>

                  <div className='flex flex-col md:flex-row gap-5'>
                    <div className='flex   flex-col w-48'>
                      <label
                        className='text-[17px] text-slate-400 font-[300]'
                        htmlFor=''
                      >
                        Department:
                      </label>
                      <select
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            department: e.target.value,
                          })
                        }
                        name=''
                        id='department'
                        required
                        className=' bg-slate-50 text-slate-900 w-full border-[2px]  flex  flex-col gap-[20px] rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                      >
                        <option className='text-[20px] '>
                          select department
                        </option>

                        <option value='mps'>
                          Mathematical and Physical Sciences
                        </option>

                        <option value='chemical sciences'>
                          Chemical Sciences
                        </option>

                        <option value='biological sciences'>
                          Biological Sciences
                        </option>
                        <option value='languages'>Languages</option>
                      </select>
                    </div>

                    <div className='flex   flex-col w-32'>
                      <label
                        className='text-[17px] text-slate-400 font-[300]'
                        htmlFor=''
                      >
                        Course:
                      </label>
                      <select
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            course: e.target.value,
                          })
                        }
                        name=''
                        id='course'
                        required
                        className=' bg-slate-50 text-slate-900 w-full border-[2px]  flex  flex-col gap-[20px] rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                      >
                        <option className='text-[20px] '>Course</option>

                        <option value='computer science'>
                          Computer Science
                        </option>
                        <option value='Biochemistry'>Biochemistry</option>
                        <option value='Mathematics'>Mathematics</option>
                        <option value='Physics'>Physics</option>
                        <option value='Chemistry'>Chemistry</option>

                        <option value='Industrial Chemistry'>
                          Industrial Chemistry
                        </option>
                        <option value='Microbiology'>Microbiology</option>
                        <option value='Statistics'>Statistics</option>

                        <option value='English Language'>
                          English Language
                        </option>
                        <option value='French'>French</option>

                        <option value='History and Diplomatic Studies'>
                          History and Diplomatic Studies
                        </option>

                        <option value='Religious Studies'>
                          Religious Studies
                        </option>
                        <option value='Philosophy'>Philosphy</option>
                        <option value='Accounting'>Accounting</option>

                        <option value='Business Administration'>
                          Business Administration
                        </option>

                        <option value='Public Administration'>
                          Public Adminstration
                        </option>

                        <option value='Banking and Finance'>
                          Banking and Finance
                        </option>
                        <option value='Economics'>Economics</option>

                        <option value='Mass Communication'>
                          Mass Communication
                        </option>
                        <option value='Law'>Law</option>
                      </select>
                    </div>
                    <div className='flex flex-col w-32'>
                      <label
                        className='text-[17px] text-slate-400 font-[400]'
                        htmlFor=''
                      >
                        Room Number:
                      </label>
                      <input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            room: e.target.value,
                          })
                        }
                        placeholder='Room Number'
                        className=' bg-slate-50 text-slate-900 w-full border-[2px]  rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                        type='number'
                        name='room'
                        id='room'
                        required
                      />
                    </div>
                  </div>

                  <div className='flex flex-col md:flex-row gap-5'>
                    <div className='flex flex-col '>
                      <label
                        className='text-[17px] text-slate-400 font-[400]'
                        htmlFor=''
                      >
                        Email Address:
                      </label>
                      <input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            email: e.target.value,
                          })
                        }
                        className=' bg-slate-50 text-slate-900 w-full border-[2px] border  placeholder:text-slate-500 rounded outline-0 px-[20px] py-[5px] '
                        type='email'
                        placeholder='Input Email'
                        name='email'
                        id='email'
                        required
                      />
                    </div>

                    <div className='flex   flex-col '>
                      <label
                        className='text-[17px] text-slate-400 font-[300]'
                        htmlFor=''
                      >
                        Level:
                      </label>
                      <select
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            level: e.target.value,
                          })
                        }
                        name=''
                        id='level'
                        required
                        className=' bg-slate-50 text-slate-900 w-full border-[2px]  flex  flex-col gap-[20px] rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                      >
                        <option className='text-[20px] '>select level</option>

                        <option value='100l' className='text-[20px] '>
                          100level
                        </option>
                        <option value='200l' className='text-[20px] '>
                          200level
                        </option>
                        <option value='300l' className='text-[20px] '>
                          300level
                        </option>
                        <option value='400l' className='text-[20px] '>
                          400level
                        </option>
                        <option value='500l' className='text-[20px] '>
                          500level
                        </option>
                      </select>
                    </div>

                    <div className='flex   flex-col w-28'>
                      <label
                        className='text-[17px] text-slate-400 font-[300]'
                        htmlFor=''
                      >
                        Gender:
                      </label>
                      <select
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            gender: e.target.value,
                          })
                        }
                        name=''
                        id='gender'
                        required
                        className=' bg-slate-50 text-slate-900 w-full border-[2px]  flex  flex-col gap-[20px] rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                      >
                        <option className='text-[20px] '>Gender</option>

                        <option value='male' className='text-[20px] '>
                          Male
                        </option>
                        <option value='female' className='text-[20px] '>
                          Female
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className='flex flex-col md:flex-row gap-3'>
                    <div className='flex flex-col '>
                      <label
                        className='text-[17px] text-slate-400 font-[400]'
                        htmlFor=''
                      >
                        Phone
                      </label>
                      <input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            phone: e.target.value,
                          })
                        }
                        placeholder='Phone Number'
                        className=' bg-slate-50 text-slate-900 w-full border-[2px] rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                        type='search'
                        x-model='input2'
                        name='phone'
                        id='phone'
                        required
                      />
                    </div>
                    <div className='flex flex-col '>
                      <label
                        className='text-[17px] text-slate-400 font-[400]'
                        htmlFor=''
                      >
                        Parent's Phone
                      </label>
                      <input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            parentPhone: e.target.value,
                          })
                        }
                        placeholder='Parent Phone'
                        className=' bg-slate-50 text-slate-900 w-full border-[2px] rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                        type='search'
                        x-model='input2'
                        name='parentPhone'
                        id='parentphone'
                        required
                      />
                    </div>
                  </div>

                  <div className='flex flex-col md:flex-row gap-3'>
                    <div className='flex flex-col '>
                      <label
                        className='text-[17px] text-slate-400 font-[400]'
                        htmlFor=''
                      >
                        Parent's Email
                      </label>
                      <input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            parentEmail: e.target.value,
                          })
                        }
                        placeholder='Parent Email'
                        className=' bg-slate-50 text-slate-900 w-full border-[2px] rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                        type='email'
                        name='parentEmail'
                        id='parentemail'
                        required
                      />
                    </div>
                    <div className='flex flex-col '>
                      <label
                        className='text-[17px] text-slate-400 font-[400]'
                        htmlFor=''
                      >
                        Password:
                      </label>
                      <input
                        onChange={(e) =>
                          setCredentials({
                            ...credentials,
                            password: e.target.value,
                          })
                        }
                        placeholder='Input Password'
                        className=' bg-slate-50 text-slate-900 w-full border-[2px] rounded  placeholder:text-slate-500 outline-0 px-[20px] py-[5px] '
                        type='password'
                        name='password'
                        id='password'
                        required
                      />
                    </div>
                  </div>
                  <button
                    onClick={Register}
                    className='hover:bg-yellow-700 shadow-2xl py-[3px] w-full bg-yellow-500  rounded text-[17px] text-slate-50 font-[400] '
                    type='button'
                  >
                    Sign Up
                  </button>
                </div>
                <div className='flex flex-row items-center gap-2'>
                  <span className='h-[4px] bg-slate-50 text-slate-900 w-full '></span>
                  <h1 className='uppercase text-slate-300 font-[400] '>OR</h1>
                  <span className='h-[4px] bg-slate-50 text-slate-900 w-full '></span>
                </div>
                <p className='text-slate-300 text-center font-[400] text-[15px] '>
                  Already have an account?{' '}
                  <Link to='/login' className='text-yellow-600'>
                    Log in
                  </Link>
                </p>
              </div>
            </form>
          }
        </div>
      </div>
    </div>
  )
}
