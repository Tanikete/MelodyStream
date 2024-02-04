import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { logo } from "../assets";

const ResetPasswordForm = () => {
  // const [email, setEmail] = useState('');
  // const [newPassword, setNewPassword] = useState('');
  const [data, setData] = useState({
    email: '',
    newPassword: '',
  });
  const navigate = useNavigate();
 

  const handleResetPassword = async (e) => {
    e.preventDefault();
const { email, newPassword } = data;
      try{
        const { data: response } = await axios.post("/reset-password", {
          email,
          newPassword,
        });
        if (response.error) {
          toast.error('Email not found');
        } else {
          setData({});
          navigate("/login");
          
          toast.success("Reset Password successful!");
        }
      }
      catch (error) {
        toast.error(error.message);
      }
  };
  //   try {
  //     // Make API request to reset password
  //     const response = await axios.post('http://localhost:8000/reset-password', {
  //       email,
  //       newPassword,
  //     });

  //     // Display success message
  //     toast.success(response.data.message);
  //     // Redirect user to login page
  //     navigate("/login")
  //   } catch (error) {
  //     // Display error message
  //     toast.error(error.message);
  //   }
  // };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center flex-col bg-black z-50">
       <img src={logo} alt="Logo" className="mb-4" width="200" height="200" />{" "}
      <div className="w-1/3">
        <form
          onSubmit={handleResetPassword}
          className="bg-transparent p-8 shadow-md rounded-md text-gray-500"
        >
          <div
            className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-pink-500 bg-clip-text"
            style={{
              userSelect: 'none',
              animation: 'textGradient 3s infinite alternate',
            }}
          >
            Password Reset
          </div>
          <label className="block mb-4">
            Email:
            <input
              type="text"
              placeholder="Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
              className="mt-1 p-2 border w-full rounded-md"
            />
          </label>
          <label className="block mb-4">
            Password:
            <input
              type="password"
              placeholder="Password"
              value={data.password}
              onChange={(e) => setData({ ...data, newPassword: e.target.value })}
              className="mt-1 p-2 border w-full rounded-md"
            />
          </label>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br hover:text-pink-400 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 transform hover:translate-x-[-5px]"
            >
              Reset Password
            </button>
          </div>
          <div className="mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up here
            </Link>
          </div>
          <div className="mt-4">
            Remembered your password?{" "}
            <Link to="/login" className="text-blue-500">
              Login here
            </Link>
          </div>
        </form>
        
      </div>
    </div>
  );
};

export default ResetPasswordForm;
