import React, { useState, useEffect } from 'react';
import {
  postResponse,
  getPosts,
  getCurrentUser,
  getUsersByDepartmentAndStat, // New helper to get departmentHead
} from '../../../../api/FirestoreAPI';
import moment from 'moment';
import ReactQuill from 'react-quill';
import ReactDatePicker from 'react-datepicker';
import 'react-quill/dist/quill.snow.css';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomDatePicker.css';
import { uploadPostImage } from '../../../../api/ImageUpload';
import { getCurrentTimestamp } from '../../../../helpers/useMoment';
import { getUniqueID } from '../../../../helpers/getUniqueID';
import emailjs from 'emailjs-com';

export default function CreateComponent() {
  const [status, setStatus] = useState('');
  const [dates, setDates] = useState([null, null]);
  const [overview, setOverview] = useState('');
  const [content, setContent] = useState('');
  const [postImage, setPostImage] = useState('');
  const [currentUser, setCurrentUser] = useState({});
  const [progress, setProgress] = useState(0);
  const [isFormValid, setIsFormValid] = useState(false);
  const [departmentHeadEmail, setDepartmentHeadEmail] = useState('');

  // Fetch user and posts data
  useEffect(() => {
    getPosts(() => {});
    getCurrentUser(setCurrentUser);
  }, []);

  // Fetch department head email after current user is fetched
  useEffect(() => {
    if (currentUser.department) {
      // Fetch department head based on user's department
      getUsersByDepartmentAndStat(currentUser.department, 'departmentHead')
        .then((departmentHead) => {
          if (departmentHead && departmentHead.length > 0) {
            setDepartmentHeadEmail(departmentHead[0].email);
          }
        })
        .catch((error) =>
          console.error('Failed to fetch department head', error)
        );
    }
  }, [currentUser.department]);

  // Function to calculate word count
  const getWordCount = (text) => {
    return text
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0).length;
  };

  // Handle date change
  const handleDateChange = (dates) => {
    setDates(dates);
  };

  // Check if the form is valid whenever form inputs change
  useEffect(() => {
    const contentWordCount = getWordCount(content);
    const isValid =
      overview.trim() !== '' &&
      contentWordCount >= 30 &&
      dates[0] !== null &&
      dates[1] !== null;

    setIsFormValid(isValid);
  }, [status, overview, content, dates]);

  // EmailJS function to send email
  const sendEmail = (emailData) => {
    emailjs
      .send('passi', 'template_snndt97', emailData, '4wzNspvOJ6BREODVT')
      .then((response) => {
        // console.log('Email sent successfully!', response.status, response.text);
      })
      .catch((error) => {
        // console.error('Failed to send email:', error);
      });
  };

  // Submit the form request and send email
  const sendRequest = async () => {
    const formattedDeparture = moment(dates[0]).format('YYYY-MM-DD');
    const formattedArrival = moment(dates[1]).format('YYYY-MM-DD');

    let requestObject = {
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
      departure: formattedDeparture,
      arrival: formattedArrival,
    };

    // Post response to Firestore
    await postResponse(requestObject);

    // Check if parent's email exists
    if (!currentUser.parentEmail) {
      // console.error('Parent email is missing!');
      return;
    }

    // Prepare email data
    const emailData = {
      from_name: 'Passi',
      cc_email: currentUser.parentEmail, // Parent's email
      to_email: departmentHeadEmail, // Department head email
      student_name: currentUser.name,
      matric_number: currentUser.matricNumber,
      department: currentUser.department,
      departure_date: formattedDeparture,
      arrival_date: formattedArrival,
      content: content,
      subject: overview, // Subject of the email
    };
    console.log('Parent Email:', currentUser.parentEmail);
    // Send email via EmailJS
    sendEmail(emailData);

    // Reset form fields after submission
    setStatus('');
    setOverview('');
    setContent('');
    setDates([null, null]);
    setPostImage('');
  };
  // console.log('Parent Email:', currentUser.parentEmail);
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
            Exeat Content (min 30 words):
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
          <p className='text-sm text-gray-600'>
            Word count: {getWordCount(content)} / 30 words minimum
          </p>
        </div>

        {/* Exeat Image */}
        <div className='flex flex-col gap-4'>
          <label className='font-semibold text-gray-700' htmlFor='image'>
            Exeat Image:
          </label>
          <input
            type='file'
            accept='image/*'
            onChange={(event) =>
              uploadPostImage(event.target.files[0], setPostImage, setProgress)
            }
            className='p-2 border rounded-md w-full'
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={!isFormValid}
          onClick={sendRequest}
          className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 ${
            !isFormValid ? 'opacity-50 cursor-not-allowed' : ''
          }`}>
          Send Exeat
        </button>
        {!isFormValid && (
          <p className='text-red-500 text-sm'>
            Please ensure all fields are filled in and the content is at least
            30 words.
          </p>
        )}
      </div>
    </div>
  );
}
