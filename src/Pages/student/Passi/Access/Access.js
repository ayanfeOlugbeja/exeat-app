import React from 'react';
import AccessComponent from './AccessComponent';
import { useLocation } from 'react-router-dom';

export default function Access() {
  const location = useLocation();
  const { currentUser } = location.state || {};

  return <AccessComponent currentUser={currentUser} />;
}
