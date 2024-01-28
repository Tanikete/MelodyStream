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
//           <span className="text-gray-700">Email:</span>
//           <input
//             type="email"
//             value={email}
//             onChange={handleEmailChange}
//             className="mt-1 p-2 border w-full rounded-md"
//             required
//           />
//         </label>
//         <label className="block mb-4">
//           <span className="text-gray-700">Password:</span>
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
import { useNavigate } from "react-router-dom";

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
      const {data} = await axios.post('/login', {email, password});
      if(data.error){
        toast.error(data.error)
      } else {
        setData({})
        navigate('/')
      }
    } catch (error) {
      
    }
    
  }

  return (
    <div>
      <form onSubmit={loginUser}>
      <label>Email</label>
        <input type="text" placeholder="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
        <label>Password</label>
        <input type="password" placeholder="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}  />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}