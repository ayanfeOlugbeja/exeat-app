import React, { useState, useEffect, useMemo } from 'react';
import {
  postResponse,
  getPosts,
  getCurrentUser,
} from '../../../../api/FirestoreAPI';
import moment from 'moment';
import { DatePicker } from 'antd';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { uploadPostImage } from '../../../../api/ImageUpload';
import { getCurrentTimestamp } from '../../../../helpers/useMoment';
import { getUniqueID } from '../../../../helpers/getUniqueID';

const { RangePicker } = DatePicker;

export default function CreateComponent() {
  const [status, setStatus] = useState('');
  const [dates, setDates] = useState([]);
  const [overview, setOverview] = useState('');
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [allStatuses, setAllStatus] = useState([]);

  useMemo(() => {
    getPosts(setAllStatus);
    getCurrentUser(setCurrentUser);
  }, []);

  const handleDateChange = (values) => {
    if (values && values.length === 2) {
      setDates(values.map((date) => moment(date).toISOString()));
    } else {
      setDates([]);
    }
  };

  const sendRequest = async () => {
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
      departure: dates[0] || '',
      arrival: dates[1] || '',
      print: false,
    };
    await postResponse(object);
    setStatus('');
    setOverview('');
    setContent('');
    setDates([]);
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
          <RangePicker
            onChange={handleDateChange}
            format='YYYY-MM-DD'
            className='w-full'
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
            id='image'
            accept='image/*'
            onChange={(event) =>
              uploadPostImage(event.target.files[0], setPostImage)
            }
            className='p-2 border rounded-md w-full'
          />
        </div>

        {/* Submit Button */}
        <button
          onClick={sendRequest}
          className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-400'
          disabled={!status || !overview || !content || dates.length < 2}>
          Upload Exeat
        </button>
      </div>
    </div>
  );
}
