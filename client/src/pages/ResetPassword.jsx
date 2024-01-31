import React, { useState } from 'react';
import axios from 'axios';

const ResetPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      // Make API request to reset password
      const response = await axios.post('http://localhost:8000/reset-password', {
        email,
        newPassword,
      });

      // Display success message
      setMessage(response.data.message);
    } catch (error) {
      // Display error message
      setMessage(error.response.data.error);
    }
  };

  return (
    <div>
      <h2>Password Reset</h2>
      <form onSubmit={handleResetPassword}>
        <label>Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <br />
        <label>New Password:
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </label>
        <br />
        <button type="submit">Reset Password</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ResetPasswordForm;
