import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../helpers/AuthProvider';
import { useNavigate } from 'react-router-dom';

const EmailVerification = () => {
  const auth = useAuth(); // Use your authentication context or hooks
  let navigate = useNavigate();
  const [verificationSent, setVerificationSent] = useState(false);

  useEffect(() => {
    const sendVerificationEmail = async () => {
      try {
        await auth.sendEmailVerification(); // Call your authentication method to send verification email
        setVerificationSent(true);
      } catch (error) {
        console.error('Error sending verification email:', error);
        // Handle error if needed
      }
    };

    sendVerificationEmail();
  }, [auth]);

  if (verificationSent) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <div className='text-center'>
          <p className='text-2xl font-bold mb-4'>
            Check your email for a verification link
          </p>
          <p className='text-gray-600'>
            Click the link in the email to verify your account before
            proceeding.
          </p>
        </div>
      </div>
    );
  }

  // Redirect to home component if verification email is sent successfully
  if (auth.user && auth.user.emailVerified) {
    navigate('/passi');
  }

  // Add a loading spinner or other UI if needed while sending verification email
  return (
    <div className='flex items-center justify-center h-screen'>
      <p className='text-2xl font-bold'>Sending verification email...</p>
    </div>
  );
};

export default EmailVerification;
