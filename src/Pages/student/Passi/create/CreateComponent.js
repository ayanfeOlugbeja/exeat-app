import React, { useState } from 'react';
import { postResponse } from '../../../../api/FirestoreAPI';
import { Button } from 'antd';
import { InputNumber, DatePicker, Space } from 'antd';
import { getCurrentTimestamp } from '../../../../helpers/useMoment';
import { getUniqueID } from '../../../../helpers/getUniqueID';
export default function CreateComponent({ currentUser }) {
  const [status, setStatus] = useState('');
  const sendRequest = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimestamp('LLL'),
      userEmail: currentUser.email,
      userName: currentUser.name,
      matricNumber: currentUser.matricNumber,
      postID: getUniqueID(),
      userID: currentUser.id,
    };
    await postResponse(object);
    await setStatus('');
  };

  const { RangePicker } = DatePicker;
  return (
    <div className='h-[100vh]'>
      <div className='title-bar h-[60px] flex items-center justify-end p-3'>
        <h2 className='text-2xl font-bold mr-24'>PASSI - Create Exeat</h2>
      </div>

      <div className='w-[40%] h-[60%] mx-auto mt-20 '>
        <div
          className='input-bar w-[95%] h-[95%] flex flex-col  items-center p-2 mx-auto m-4'
          style={{ border: '1px solid black' }}>
          <input
            type='text'
            placeholder='Reason for request?'
            className='w-[80%] h-[50px] rounded'
            style={{ border: '1px solid #212121' }}
            onChange={(e) => setStatus(e.target.value)}
            value={status}
            required
          />
          <InputNumber
            prefix='+234'
            style={{
              width: '100%',
            }}
            required
          />
          <Space direction='vertical' size={10}>
            <RangePicker required />
          </Space>
          <Button
            key='submit'
            onClick={sendRequest}
            disabled={status.length > 0 ? false : true}>
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
