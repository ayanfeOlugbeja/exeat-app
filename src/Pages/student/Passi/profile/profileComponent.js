import React, { useState } from 'react'
import ProfileCard from '../../Components/common/ProfileCard'

function ProfileComponent({ currentUser }) {
  return (
    <div>
      <ProfileCard currentUser={currentUser} />
    </div>
  )
}

export default ProfileComponent
