import React from 'react';
import CreateComponent from './CreateComponent';
import { useLocation } from 'react-router-dom';
export default function Create() {
  const location = useLocation();
  const { currentUser } = location.state || {};

  return <CreateComponent currentUser={currentUser} />;
}
