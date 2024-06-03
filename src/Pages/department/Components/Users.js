import React, { useEffect, useState } from 'react'

import { getAllUsers } from './../../../api/FirestoreAPI'

export const Users = ({ currentUser }) => {
  const [userList, setUserList] = useState([])
  const [searchUser, setSearchedUser] = useState([])

  useEffect(() => {
    getAllUsers(setUserList)
  }, [])

  return (
    <div className='justify-center flex'>
      <div className='md:ml-2 ml-[150px]'>
        <p className='  md:my-[25px] text-center font-bold uppercase text-[20px] '>
          Registered users
        </p>
        <div className='flex justify-center'>
          <input
            onChange={(e) => {
              const value = e.target.value
              const findUser = userList.filter((user) => {
                return (
                  user.name
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase()) ||
                  user.email
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase()) ||
                  user.level
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase())
                )
              })
              setSearchedUser(findUser)
            }}
            type='text'
            placeholder='Search for a user'
            className='border-2 outline-0  px-[20px] rounded  '
            name=''
            id=''
          />
        </div>
        <table class='border-separate relative  overflow-x-scroll   border-spacing-2  shadow-2xl ...'>
          <thead className=' '>
            <tr className=''>
              <th class='  md:text-[25px] text-[10px] py-1 rounded px-2 uppercase shadow'>
                s/n
              </th>
              <th class='  md:text-[25px] text-[10px] py-1 px-2 rounded uppercase shadow'>
                Full Name
              </th>
              <th class=' md:text-[25px] text-[10px] py-1 px-2  rounded uppercase shadow'>
                Email Address
              </th>
              <th class=' md:text-[25px] text-[10px] py-1 px-2 rounded uppercase shadow'>
                Level
              </th>
              <th class=' md:text-[25px] text-[10px] py-1 px-2 rounded uppercase shadow'>
                picture
              </th>
            </tr>
          </thead>
          <tbody className=' overflow-x-auto '>
            {searchUser.length !== 0 &&
              searchUser.map((user, index) => {
                return (
                  <tr className=''>
                    <td class='  ... text-[10px] md:text-[14px] font-bold text-slate-500 py-1 px-2 '>
                      {index + 1}
                    </td>
                    <td class=' border border-slate-100 ... text-[10px] md:text-[14px] text-slate-500 py-1 px-2 '>
                      {user.name}
                    </td>
                    <td class=' border border-slate-100 ... text-[10px] md:text-[14px]  text-slate-500 py-1 px-2 '>
                      {user.email}
                    </td>
                    <td class=' border border-slate-100 ... text-[10px] md:text-[14px]  text-slate-500 py-1 px-2 '>
                      {user.level}
                    </td>
                    <td class='  text-[10px] md:text-[14px] w-fit  text-slate-500 py-1 px-2 '>
                      <img
                        className='max-w-[60px] max-h-[60px] rounded '
                        src={user?.imageLink}
                        alt=''
                      />
                    </td>
                  </tr>
                )
              })}
            {searchUser.length === 0 &&
              userList.map((user, index) => {
                return (
                  <tr className=''>
                    <td class='  ... text-[10px] md:text-[14px] font-bold text-slate-500 py-1 px-2 '>
                      {index + 1}
                    </td>
                    <td class=' border border-slate-100 ... text-[10px] md:text-[14px] text-slate-500 p-1 '>
                      {user.name}
                    </td>
                    <td class=' border border-slate-100 ... text-[10px] md:text-[14px]  text-slate-500 py-1 px-2 '>
                      {user.email}
                      <br />
                    </td>
                    <td class=' border border-slate-100 ... text-[10px] md:text-[14px]  text-slate-500 py-1 px-2 '>
                      {user.level}
                    </td>

                    <td class='  text-[10px] md:text-[14px] w-fit  text-slate-500 py-1 px-2 '>
                      <img
                        className='max-w-[60px] max-h-[60px] rounded '
                        src={user?.imageLink}
                        alt=''
                      />{' '}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
