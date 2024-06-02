import React, { useState, useMemo, useEffect } from 'react'
import {
  postResponse,
  getPosts,
  updatePost,
} from '../../../../api/FirestoreAPI'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { uploadPostImage } from '../../../../api/ImageUpload'
import 'react-toastify/dist/ReactToastify.css'
import { getCurrentTimestamp } from '../../../../helpers/useMoment'
import { getUniqueID } from '../../../../helpers/getUniqueID'

export default function CreateComponent({ currentUser }) {
  const [status, setStatus] = useState('')
  const [allStatuses, setAllStatus] = useState([])
  const [currentPost, setCurrentPost] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [postImage, setPostImage] = useState('')
  // console.log(currentUser);
  const [newsContents, setNewsContents] = useState({
    headline: '',
    overview: '',
  })
  console.log(newsContents)
  const sendRequest = async () => {
    let object = {
      status: status,
      timestamp: getCurrentTimestamp('LLL'),
      userEmail: currentUser.email,
      userName: currentUser.name,
      matricNumber: currentUser.matricNumber,
      department: currentUser.department,
      postID: getUniqueID(),
      userID: currentUser.id,
      postImage: postImage,
      headline: newsContents.headline,
      overview: newsContents.overview,
    }
    await postResponse(object)
    setIsEdit(false)
    await setStatus('')
  }
  const getEditData = (posts) => {
    setStatus(posts?.status)
    setCurrentPost(posts)
    setIsEdit(true)
  }

  const updateStatus = () => {
    updatePost(currentPost.id, status, postImage)
  }

  useMemo(() => {
    getPosts(setAllStatus)
  }, [])

  const [progress, setProgress] = useState(0)
  const [fileType, setFileType] = useState('image')

  // const { RangePicker } = DatePicker;

  return (
    <div
      on
      className='py-[20px] shadow rounded-[30px] m-[20px] mt-[80px] px-[40px] font-poppins justify-center bg-gray-50 overflow-x-hidden flex flex-row '
    >
      <div className='grid grid-cols-1 gap-5'>
        <div className='flex flex-col gap-5 md:flex-row  '>
          <div className='flex flex-col gap-0 '>
            <label
              className='capitalize font-[600] text-[13px] '
              htmlFor='headline'
            >
              headline :
            </label>
            <input
              onChange={(e) =>
                setNewsContents({
                  ...newsContents,
                  headline: e.target.value,
                })
              }
              type='text'
              className='p-4 bg-white capitalize text-[13px] outline-0 shadow rounded  w-full '
              name='headline'
              placeholder='Exeat headline'
              id=''
            />
          </div>
          <div className='flex flex-col gap-0 '>
            <label
              className='capitalize font-[600] text-[13px] '
              htmlFor='headline'
            >
              overview:
            </label>
            <input
              onChange={(e) =>
                setNewsContents({
                  ...newsContents,
                  overview: e.target.value,
                })
              }
              type='text'
              className='p-4 bg-white capitalize text-[13px] outline-0 shadow rounded  w-full '
              name='headline'
              placeholder='Exeat overview'
              id=''
            />
          </div>

          <div className='flex flex-col gap-0 '>
            {
              <label
                className='capitalize font-[600] text-[13px] '
                htmlFor='headline'
              >
                Exeat image
              </label>
            }
            <input
              onChange={(event) =>
                uploadPostImage(
                  event.target.files[0],
                  setPostImage,
                  setProgress
                )
              }
              accept={`${fileType}/*`}
              type='file'
              className='p-3 file:bg-white file:border-0 capitalize text-[15px] bg-white outline-0 shadow rounded  w-full '
              name='headline'
              placeholder='News headline'
              id=''
            />
          </div>
        </div>

        {/* <Space direction='vertical' size={10}>
            <RangePicker required />
          </Space> */}

        <div className='flex flex-col gap-0 '>
          <label
            className='capitalize font-[600] text-[13px] '
            htmlFor='headline'
          >
            Exeat Content :
          </label>
          <ReactQuill
            className='md:max-w-[700px]  rounded-[30px] max-w-[500px] md:min-h-[30vh] lg:max-w-[1100px] '
            onChange={setStatus}
            value={status}
            placeholder='Full contents of the Exeat'
            modules={{
              toolbar: {
                container: [
                  ['bold', 'italic', 'underline', 'strike'], // Basic formatting button
                  ['script'],
                  [{ font: [] }],
                  [{ align: [] }],
                  [{ color: [] }, { background: [] }],
                  ['blockquote'],
                  [{ size: ['small', false, 'large', 'huge'] }],
                  [{ header: 1 }, { header: 2 }], // Header formatting buttons
                  [{ list: 'ordered' }, { list: 'bullet' }], // List buttons
                  ['link'], // Link and media buttons
                  ['uppercase', 'capitalize', 'lowercase'],
                ],
              },
            }}
          />
        </div>

        <button
          className='bg-slate-900 w-fit  mt-[100px] md:mt-[50px] shadow py-2 px-5 rounded text-slate-50 text-[13px] hover:bg-slate-700 '
          onClick={sendRequest}
          key='submit'
          type='primary'
          disabled={status.length > 0 ? false : true}
        >
          Upload Exeat
        </button>
      </div>
    </div>
  )
}
