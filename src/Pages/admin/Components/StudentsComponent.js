import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../api/FirestoreAPI';

export default function StudentsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  // const getCurrentUser = currentUser.id
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return (
    <div className='justify-center flex'>
      <div className='md:ml-2 ml-[150px]'>
        <p className=' text-[15px] md:my-[25px] text-center font-bold uppercase '>
          Registered users
        </p>
        {/* <div className='flex justify-center'>
          <input
            onChange={(e) => {
              const value = e.target.value;
              const findUser = userList.filter((user) => {
                return (
                  user.firstName
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase()) ||
                  user.lastName
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase()) ||
                  user.email
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase()) ||
                  user.userLevel
                    .toLocaleLowerCase()
                    .includes(value.toLocaleLowerCase())
                );
              });
              setSearchedUser(findUser);
            }}
            type='text'
            placeholder='Search for a user'
            className='border-2 outline-0  px-[20px] rounded  '
            name=''
            id=''
          />
        </div> */}
        <table className='border-separate relative overflow-x-scroll border-spacing-2 shadow-2xl '>
          <thead className=' '>
            <tr className=''>
              <th className='md:text-[25px] text-[10px] py-1 px-2 rounded uppercase shadow'>
                Full Name
              </th>
              <th className='md:text-[25px] text-[10px] py-1 px-2 rounded uppercase shadow'>
                Email Address
              </th>
              <th className='md:text-[25px] text-[10px] py-1 px-2 rounded uppercase shadow'>
                Level
              </th>
              <th className='md:text-[25px] text-[10px] py-1 px-2 rounded uppercase shadow'>
                Picture
              </th>
            </tr>
          </thead>
          <tbody className='overflow-x-auto '>
            {users.map((user) => (
              <tr className='' key={user.id}>
                <td className='border border-slate-100 ... text-[10px] md:text-[14px] text-slate-500 p-1 '>
                  {user.name}
                </td>
                <td className='border border-slate-100 ... text-[10px] md:text-[14px] text-slate-500 py-1 px-2 '>
                  {user.email}
                </td>
                <td className='border border-slate-100 ... text-[10px] md:text-[14px] text-slate-500 py-1 px-2 '>
                  {user.level}
                </td>
                <td className='text-[10px] md:text-[14px] w-fit text-slate-500 py-1 px-2 '>
                  <img
                    className='max-w-[60px] max-h-[60px] rounded'
                    src={user.imageLink}
                    alt=''
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
