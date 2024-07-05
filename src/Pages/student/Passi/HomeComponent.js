import React from 'react'
import school from './../../../Images/schoolLogo.png'

// student dashboard
export default function HomeComponent() {
  return (
    <div className='flex justify-center items-center'>
      <img src={school} alt='school-logo' />
    </div>
  )
}
