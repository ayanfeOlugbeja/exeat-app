import React, { useState } from 'react';
import ProfileCard from '../student/Components/common/ProfileCard';
import ProfileEdit from '../student/Components/common/ProfileEdit';

function ProfileComponent({ currentUser }) {
  const [isEdit, setIsEdit] = useState(false);
  const onEdit = () => {
    setIsEdit(!isEdit);
  };
  return (
    <div>
      {isEdit ? (
        <ProfileEdit onEdit={onEdit} currentUser={currentUser} />
      ) : (
        <ProfileCard currentUser={currentUser} onEdit={onEdit} />
      )}
    </div>
  );
}

export default ProfileComponent;
