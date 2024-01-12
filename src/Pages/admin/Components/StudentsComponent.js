import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../../../api/FirestoreAPI';

export default function StudentsComponent({ currentUser }) {
  const [users, setUsers] = useState([]);
  // const getCurrentUser = currentUser.id
  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  return users.length > 1 ? (
    <div className='connections-main p-4 flex flex-col gap-3'>
      {users.map((user) => {
        return user.id === currentUser.id ? (
          <></>
        ) : (
          // <ConnectedUsers
          //   currentUser={currentUser}
          //   user={user}
          //   getCurrentUser={getCurrentUser}
          // />
          <div
            className='grid-child w-[93%] h-[100px] flex flex-row flex-nowrap justify-between items-center ml-[80px]  '
            style={{ border: '2px solid black' }}>
            <img
              src={user.imageLink}
              alt='user-profileimage'
              className=' w-[60px] h-[60px]'
              style={{ border: '1px solid black' }}
            />
            <p className='name'>{user.name}</p>
            <p className='headline'>{user.headline}</p>

            {/* <button onClick={() => getCurrentUser(user.id)}>
        <AiOutlineUsergroupAdd size={20} />
        Connect
      </button> */}
          </div>
        );
      })}
    </div>
  ) : (
    <div className='connections-main'>No Connections to Add!</div>
  );
}
