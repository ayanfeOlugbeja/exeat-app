import React from 'react';
import { Space, Spin } from 'antd';
export default function Loader() {
  return (
    <div className='absolute top-[50vh] left-[50vw]'>
      <Space size='large'>
        {/* <p className='block'>Loading...</p> */}
        <Spin size='large' />
      </Space>
    </div>
  );
}
