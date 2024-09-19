import React, { useState, useMemo } from 'react';
import {
  postResponse,
  getPosts,
  getCurrentUser,
} from '../../../../api/FirestoreAPI';
import moment from 'moment';
import ReactQuill from 'react-quill';
import ReactDatePicker from 'react-datepicker';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css'; // Import for basic styles
import './CustomDatePicker.css'; // Import your custom styles
import { uploadPostImage } from '../../../../api/ImageUpload';
import { getCurrentTimestamp } from '../../../../helpers/useMoment';
import { getUniqueID } from '../../../../helpers/getUniqueID';
import { Modal } from 'antd';

export default function CreateComponent() {
  const [status, setStatus] = useState('');
  const [dates, setDates] = useState([null, null]);
  const [overview, setOverview] = useState('');
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [allStatuses, setAllStatus] = useState([]);
  const [progress, setProgress] = useState(0);
  const [fileType, setFileType] = useState('image');

  useMemo(() => {
    getPosts(setAllStatus);
    getCurrentUser(setCurrentUser);
  }, []);

  // Handle date change with react-datepicker
  const handleDateChange = (dates) => {
    setDates(dates);
  };

  // Check if form is valid for enabling the button
  const isFormValid = status && overview && content && dates[0] && dates[1];

  const sendRequest = async () => {
    const formattedDeparture = moment(dates[0]).format('YYYY-MM-DD');
    const formattedArrival = moment(dates[1]).format('YYYY-MM-DD');

    let object = {
      status,
      timestamp: getCurrentTimestamp('LLL'),
      userEmail: currentUser.email,
      userName: currentUser.name,
      matricNumber: currentUser.matricNumber,
      department: currentUser.department,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage,
      overview,
      content,
      departmentApproved: false,
      adminApproved: false,
      Rejected: false,
      departure: formattedDeparture,
      arrival: formattedArrival,
      print: false,
    };

    await postResponse(object);
    // Reset form fields
    setStatus('');
    setOverview('');
    setContent('');
    setDates([null, null]);
    setPostImage('');
  };

  return (
    <div className='py-8 px-6 mx-auto max-w-4xl bg-white shadow-lg rounded-lg'>
      <div className='flex flex-col gap-6'>
        {/* Date Picker */}
        <div className='flex flex-col gap-4'>
          <label className='font-semibold text-gray-700' htmlFor='dates'>
            Departure and Arrival Dates:
          </label>
          <ReactDatePicker
            selected={dates[0]}
            onChange={handleDateChange}
            startDate={dates[0]}
            endDate={dates[1]}
            selectsRange
            dateFormat='yyyy-MM-dd'
            placeholderText='Select date range'
            className='w-full p-2 border rounded-md'
          />
        </div>

        {/* Exeat Overview */}
        <div className='flex flex-col gap-4'>
          <label className='font-semibold text-gray-700' htmlFor='overview'>
            Exeat Overview:
          </label>
          <input
            type='text'
            id='overview'
            value={overview}
            onChange={(e) => setOverview(e.target.value)}
            placeholder='Enter overview here'
            className='p-4 border rounded-md w-full'
          />
        </div>

        {/* Exeat Content */}
        <div className='flex flex-col gap-4'>
          <label className='font-semibold text-gray-700' htmlFor='content'>
            Exeat Content:
          </label>
          <ReactQuill
            id='content'
            value={content}
            onChange={setContent}
            placeholder='Enter content here'
            className='border rounded-md'
            modules={{
              toolbar: [
                [{ font: [] }],
                [{ size: [] }],
                ['bold', 'italic', 'underline'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link', 'image'],
                [{ align: [] }],
                [{ color: [] }, { background: [] }],
              ],
            }}
          />
        </div>

        {/* Exeat Image */}
        <div className='flex flex-col gap-4'>
          <label className='font-semibold text-gray-700' htmlFor='image'>
            Exeat Image:
          </label>

          <input
            type='file'
            accept={`${fileType}/*`}
            onChange={(event) =>
              uploadPostImage(event.target.files[0], setPostImage, setProgress)
            }
            className='p-2 border rounded-md w-full'
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={sendRequest}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${
            !isFormValid && 'disabled:bg-gray-400'
          }`}>
          Send Exeat
        </button>
      </div>
    </div>
  );
}
