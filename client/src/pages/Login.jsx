// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail, fetchSignInMethodsForEmail } from 'firebase/auth';

// // Replace with your Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAwBrF1M7qvtxl3u4inVGKmo0HF5wACzoY",
//   authDomain: "melodystream-95b89.firebaseapp.com",
//   projectId: "melodystream-95b89",
//   storageBucket: "melodystream-95b89.appspot.com",
//   messagingSenderId: "785973148626",
//   appId: "1:785973148626:web:1a615b0e5518fe5cf0660b"
// };

// const firebaseApp = initializeApp(firebaseConfig);
// const auth = getAuth(firebaseApp);

// const LoginForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setError(null);
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setError(null);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       console.log('Login successful:', user);
//       navigate('/');
//     } catch (error) {
//       setError('Invalid email or password. Please try again.');
//       console.error('Error during login:', error.message);
//     }
//   };

//   const handleForgotPassword = async () => {
//     try {
//       // Check if the email is already registered
//       const signInMethods = await fetchSignInMethodsForEmail(auth, email);

//       if (signInMethods && signInMethods.length > 0) {
//         // Email is registered, proceed with sending reset password email
//         await sendPasswordResetEmail(auth, email);
//         setError(null);
//         console.log('Password reset email sent. Check your email inbox.');
//       } else {
//         // Email is not registered, show an error message
//         setError('Email is not registered. Please sign up.');
//       }
//     } catch (error) {
//       setError('Error checking email status or sending password reset email. Please try again.');
//       console.error('Error during password reset:', error.message);
//     }
//   };

//   return (
//     <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center flex-col bg-white z-50">
//       <h1>Login</h1>
//       <form onSubmit={handleSubmit} className="bg-white p-8 shadow-md rounded-md">
//         <label className="block mb-4">
//           <div className="text-gray-700">Email:</div>
//           <input
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             className="mt-1 p-2 border w-full rounded-md"
//             required
//           />
//         </label>
//         <label className="block mb-4">
//           <div className="text-gray-700">Password:</div>
//           <input
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//             className="mt-1 p-2 border w-full rounded-md"
//             required
//             autoComplete='current-password'
//           />
//         </label>
//         {error && <div className="text-red-500 mb-4">{error}</div>}
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
//           Login
//         </button>
//         <div className="mt-2">
//           <button
//             type="button"
//             onClick={handleForgotPassword}
//             className="text-blue-500 underline hover:text-blue-700 focus:outline-none"
//           >
//             Forgot Password?
//           </button>
//         </div>
//         <div className="mt-4">
//           Don't have an account? <Link to="/signup" className="text-blue-500">Sign up here</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default LoginForm;

import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { logo } from "../assets"; // Replace "../path/to/logo.png" with the actual path to your logo image

export default function Login() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();
    const { email, password } = data;
    try {
      const { data: response } = await axios.post("/login", {
        email,
        password,
      });
      if (response.error) {
        toast.error(response.error);
      } else {
        setData({});
        navigate("/");
        window.location.reload();
        toast.success("Login successful!");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center flex-col bg-black z-50">
      <img src={logo} alt="Logo" className="mb-4" width="200" height="200" />{" "}
      {/* Add the logo image here */}
      <div className="w-1/3">
        <form
          onSubmit={loginUser}
          className="bg-transparent p-8 shadow-md rounded-md text-gray-500"
        >
          <div
      className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-pink-500 bg-clip-text"
      style={{
        userSelect: 'none',
        animation: 'textGradient 3s infinite alternate',
      }}
    >
      Login Page
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
              onChange={(e) => setData({ ...data, password: e.target.value })}
              className="mt-1 p-2 border w-full rounded-md"
            />
          </label>
          <div className="mt-4 flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Login
            </button>
          </div>
          <div className="mt-4">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-500">
              Sign up here
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
