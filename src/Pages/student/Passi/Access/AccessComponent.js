import React, { useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useReactToPrint } from 'react-to-print';
import school from '../../../../Images/schoolLogo.png';
import label from './../../../../Images/label.png';
import rejected from './../../../../Images/rejected.png';
import { getCurrentUser, getAllUsers } from '../../../../api/FirestoreAPI';

export default function AccessComponent({ posts, id }) {
  const [currentUser, setCurrentUser] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [exeatModal, setExeatModal] = useState(false);
  const [imageModal, setImageModal] = useState(false);
  const navigate = useNavigate();
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  useMemo(() => {
    getCurrentUser(setCurrentUser);
    getAllUsers(setAllUsers);
  }, []);

  const user = allUsers.find((user) => user.id === posts.userID) || {};

  return currentUser.id === posts.userID ? (
    <div
      className='posts-card bg-white shadow-lg rounded-lg p-6 max-w-full w-full lg:max-w-4xl relative my-4'
      key={id}
      ref={printRef}>
      {/* Approval Banner */}
      {!posts.departmentApproved && !posts.adminApproved && (
        <ApprovalBanner
          message='Waiting for HOD Approval!'
          bgColor='bg-rose-600'
        />
      )}
      {posts.departmentApproved && !posts.adminApproved && (
        <ApprovalBanner
          message='Waiting for Hall Administrator Approval!'
          bgColor='bg-green-600'
        />
      )}

      {/* Header */}
      <div className='header flex flex-col lg:flex-row items-center justify-between gap-4'>
        <img src={school} alt='school logo' className='w-24 h-24' />
        <div className='text-center lg:text-2xl font-extrabold text-lg'>
          <p>GLORIOUS VISION UNIVERSITY</p>
          <p>STUDENTS EXEAT FORM</p>
        </div>
      </div>

      {/* Body */}
      <div className='body my-4 flex flex-col lg:flex-row items-center justify-between gap-6'>
        <img
          src={user.imageLink}
          alt='student'
          className='profile-image w-32 h-32 lg:w-36 lg:h-36 rounded-full object-cover'
        />
        <UserInfo user={user} posts={posts} />
      </div>

      {/* Exeat Request */}
      <div className='request text-center text-xl font-bold flex flex-col gap-2'>
        <p dangerouslySetInnerHTML={{ __html: posts.overview }}></p>
        <p
          className='cursor-pointer text-rose-800 text-sm font-light'
          onClick={() => setExeatModal(true)}>
          View Exeat Request
        </p>
      </div>

      {/* Print Button and Image */}
      <div className='flex justify-between items-center mt-4'>
        {posts.postImage && (
          <div className='flex items-center gap-2'>
            <img
              src={posts.postImage}
              className='w-20 h-16 object-contain'
              alt='attachment'
            />
            <p
              className='cursor-pointer text-blue-800'
              onClick={() => setImageModal(true)}>
              View Attachment
            </p>
          </div>
        )}
        {posts.adminApproved && (
          <button
            className='bg-blue-800 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition-all'
            onClick={handlePrint}>
            Print Exeat
          </button>
        )}
      </div>

      {/* Modals */}
      <ImageModal
        imageModal={imageModal}
        setImageModal={setImageModal}
        postImage={posts.postImage}
      />
      <ExeatModal
        exeatModal={exeatModal}
        setExeatModal={setExeatModal}
        overview={posts.overview}
        status={posts.status}
      />

      {/* Background Elements */}
      {posts.adminApproved && <Watermark label={label} school={school} />}
      {posts.Rejected && <Watermark label={rejected} school={school} />}
    </div>
  ) : null;
}

const ApprovalBanner = ({ message, bgColor }) => (
  <div
    className={`w-full py-1 text-center font-bold text-sm text-white ${bgColor} rounded-t-lg`}>
    {message}
  </div>
);

const UserInfo = ({ user, posts }) => (
  <div className='text-sm lg:text-base w-full lg:w-2/3 space-y-2 font-medium'>
    <p>
      <strong>Name:</strong> {user.name}
    </p>
    <p>
      <strong>Matric Number:</strong> {user.matricNumber}
    </p>
    <p>
      <strong>Department:</strong> {user.department}
    </p>
    <p>
      <strong>Course:</strong> {user.course}
    </p>
    <p>
      <strong>Academic Level:</strong> {user.level}
    </p>
    <p>
      <strong>Gender:</strong> {user.gender}
    </p>
    <p>
      <strong>Room Number:</strong> {user.room}
    </p>
    <p>
      <strong>Phone Number:</strong> {user.phone}
    </p>
    <p>
      <strong>Parent's Number:</strong> {user.parentPhone}
    </p>
    <p>
      <strong>Departure:</strong> {posts.departure}
    </p>
    <p>
      <strong>Arrival:</strong> {posts.arrival}
    </p>
  </div>
);

const ImageModal = ({ imageModal, setImageModal, postImage }) => (
  <Modal
    centered
    open={imageModal}
    onOk={() => setImageModal(false)}
    onCancel={() => setImageModal(false)}
    footer={null}>
    <img
      src={postImage}
      alt='exeat attachment'
      className='w-full h-auto object-contain'
    />
  </Modal>
);

const ExeatModal = ({ exeatModal, setExeatModal, overview, status }) => (
  <Modal
    centered
    open={exeatModal}
    onOk={() => setExeatModal(false)}
    onCancel={() => setExeatModal(false)}
    footer={null}>
    <div className='p-4 space-y-4'>
      <p
        className='font-bold text-lg'
        dangerouslySetInnerHTML={{ __html: overview }}></p>
      <p
        className='font-medium text-justify'
        dangerouslySetInnerHTML={{ __html: status }}></p>
    </div>
  </Modal>
);

const Watermark = ({ label, school }) => (
  <div className='absolute top-20 right-4 opacity-20'>
    <img src={label} alt='label' />
    <img
      src={school}
      alt='school watermark'
      className='absolute top-0 right-8 opacity-10 w-1/2 h-1/2 object-contain'
    />
  </div>
);
