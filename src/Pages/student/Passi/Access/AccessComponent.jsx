import React, { useMemo, useState, useRef } from 'react'
import { Modal } from 'antd'
import { useReactToPrint } from 'react-to-print'
import school from '../../../../Images/schoolLogo.png'
import label from './../../../../Images/label.png'
import rejected from './../../../../Images/rejected.png'
import { getCurrentUser, getAllUsers } from '../../../../api/FirestoreAPI'

export default function AccessComponent({ posts, id }) {
  const [currentUser, setCurrentUser] = useState({})
  const [allUsers, setAllUsers] = useState([])
  const [exeatModal, setExeatModal] = useState(false)
  const [imageModal, setImageModal] = useState(false)
  const printRef = useRef()

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  })

  useMemo(() => {
    getCurrentUser(setCurrentUser)
    getAllUsers(setAllUsers)
  }, [])

  const user = allUsers.find((user) => user.id === posts.userID) || {}

  return (
    <div
      className='posts-card bg-white shadow-xl rounded-lg p-6 max-w-3xl w-full lg:max-w-4xl relative my-4'
      key={id}
      ref={printRef}
    >
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
      <div className='flex items-center justify-between gap-4'>
        <img src={school} alt='school logo' className='w-16 h-16' />
        <div className='text-center lg:text-xl font-bold'>
          <p>GLORIOUS VISION UNIVERSITY</p>
          <p>STUDENTS EXEAT FORM</p>
        </div>
      </div>

      {/* Body */}
      <div className='my-4 flex items-center justify-between gap-6'>
        <img
          src={user.imageLink}
          alt='student'
          className='w-28 h-28 rounded-full object-cover shadow-lg'
        />
        <div className='text-sm lg:text-base font-medium'>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Name:</strong> {user.name}
          </p>
          <p>
            <strong>Matric Number:</strong> {user.matricNumber}
          </p>
        </div>
      </div>

      {/* View Exeat Request */}
      <div className='text-center mt-4'>
        <button
          className='bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600'
          onClick={() => setExeatModal(true)}
        >
          View Exeat Request
        </button>
      </div>

      {/* Print Button */}
      {posts.adminApproved && (
        <div className='flex justify-end mt-4'>
          <button
            className='bg-blue-800 text-white py-2 px-5 rounded-lg hover:bg-blue-700 transition-all'
            onClick={handlePrint}
          >
            Print Exeat
          </button>
        </div>
      )}

      {/* Modals */}
      <ImageModal
        imageModal={imageModal}
        setImageModal={setImageModal}
        postImage={posts.postImage}
      />
      <ExeatModal
        exeatModal={exeatModal}
        setExeatModal={setExeatModal}
        posts={posts}
        user={user}
      />

      {/* Watermarks */}
      {posts.adminApproved && <Watermark label={label} school={school} />}
      {posts.Rejected && <Watermark label={rejected} school={school} />}
    </div>
  )
}

/* Approval Banner Component */
const ApprovalBanner = ({ message, bgColor }) => (
  <div
    className={`w-full py-1 text-center font-bold text-sm text-white ${bgColor} rounded-t-lg`}
  >
    {message}
  </div>
)

/* Exeat Modal */
const ExeatModal = ({ exeatModal, setExeatModal, posts, user }) => (
  <Modal
    centered
    open={exeatModal}
    onOk={() => setExeatModal(false)}
    onCancel={() => setExeatModal(false)}
    footer={null}
    className='custom-modal'
  >
    <div className='p-6'>
      <h2 className='text-2xl font-bold text-center'>Exeat Request Details</h2>

      <div className='mt-4 text-lg font-serif leading-relaxed space-y-4'>
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
          <strong>Departure Date:</strong> {posts.departure}
        </p>
        <p>
          <strong>Arrival Date:</strong> {posts.arrival}
        </p>

        <hr className='my-4' />

        <p>
          <strong>Exeat Overview:</strong>
        </p>
        <p dangerouslySetInnerHTML={{ __html: posts.overview }}></p>

        <p className='mt-4'>
          <strong>Exeat Content:</strong>
        </p>
        <p dangerouslySetInnerHTML={{ __html: posts.content }}></p>
      </div>
    </div>
  </Modal>
)

/* Image Modal */
const ImageModal = ({ imageModal, setImageModal, postImage }) => (
  <Modal
    centered
    open={imageModal}
    onOk={() => setImageModal(false)}
    onCancel={() => setImageModal(false)}
    footer={null}
  >
    <img
      src={postImage}
      alt='exeat attachment'
      className='w-full h-auto object-contain'
    />
  </Modal>
)

/* Watermark */
const Watermark = ({ label, school }) => (
  <div className='absolute top-24 right-4 opacity-20'>
    <img src={label} alt='label' />
    <img
      src={school}
      alt='school watermark'
      className='absolute top-0 right-8 opacity-10 w-1/2 h-1/2 object-contain'
    />
  </div>
)
