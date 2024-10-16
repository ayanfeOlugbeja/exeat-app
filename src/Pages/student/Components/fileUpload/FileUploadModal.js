import React from 'react';
import { Button, Modal, Progress } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
export default function FileUploadModal({
  modalOpen,
  setModalOpen,
  getImage,
  uploadImage,
  currentImage,
  progress,
}) {
  return (
    <div>
      <Modal
        title='Add a Profile Image'
        centered
        open={modalOpen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Button
            key='submit'
            type='primary'
            onClick={uploadImage}
            disabled={!currentImage?.name}
            style={{
              borderRadius: '8px',
              backgroundColor: currentImage?.name ? '#4CAF50' : '#d9d9d9',
              borderColor: currentImage?.name ? '#4CAF50' : '#d9d9d9',
            }}>
            Upload Profile Picture
          </Button>,
        ]}>
        <div className='image-upload-main'>
          <p>{currentImage.name}</p>
          <Button
            icon={<UploadOutlined />}
            style={{
              marginTop: '10px',
              borderRadius: '8px',
              backgroundColor: '#1890ff',
              color: 'white',
            }}>
            <label className='upload-btn' for='image-upload'>
              Add an Image
            </label>
          </Button>
          {progress === 0 ? (
            <></>
          ) : (
            <div className='progress-bar'>
              <Progress
                type='circle'
                percent={progress}
                strokeColor={{
                  '0%': '#108ee9',
                  '100%': '#87d068',
                }}
                strokeWidth={10}
              />
            </div>
          )}
          <input hidden id='image-upload' type={'file'} onChange={getImage} />
        </div>
      </Modal>
    </div>
  );
}
