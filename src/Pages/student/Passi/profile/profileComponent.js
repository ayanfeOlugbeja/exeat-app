import React, { useState } from 'react';
import ProfileCard from '../../Components/common/ProfileCard';
import ProfileEdit from '../../Components/common/ProfileEdit';

function profileComponent({ currentUser }) {
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

export default profileComponent;
