// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

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

// const SignupForm = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   const handleEmailChange = (e) => {
//     setEmail(e.target.value);
//     setError(null); // Clear error when the user starts typing again
//   };

//   const handlePasswordChange = (e) => {
//     setPassword(e.target.value);
//     setError(null); // Clear error when the user starts typing again
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       console.log('Signup successful:', user);
//       // Redirect to the login page after successful signup
//       navigate('/login');
//     } catch (error) {
//       if (error.code === 'auth/email-already-in-use') {
//         setError('Email is already in use. If you already have an account, you can login.');
//       } else {
//         setError('Error during signup. Please try again.');
//       }
//       console.error('Error during signup:', error.message);
//     }
//   };

//   return (
//     <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center flex-col bg-white z-50">
//       <h1>Signup</h1>
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
//           Signup
//         </button>
//         <div className="mt-4">
//           Already have an account? <Link to="/login" className="text-blue-500">Login here</Link>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SignupForm;

import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";
import { logo } from "../assets";

export default function Register() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = data;
    try {
      const { data } = await axios.post("/register", { name, email, password });
      if (data.error) {
        toast.error(data.error);
      } else {
        setData({});
        toast.success("Login successful");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="absolute top-0 left-0 h-full w-full flex justify-center items-center flex-col bg-black z-50">
      <img src={logo} alt="Logo" className="mb-4" width="200" height="200" />
      <div className="w-1/3">
      <form
        onSubmit={registerUser}
        className="bg-transparent p-8 shadow-md rounded-md text-gray-500 "
      >
      <div
      className="text-2xl font-bold mb-4 text-center bg-gradient-to-r from-green-400 to-pink-500 bg-clip-text"
      style={{
        userSelect: 'none',
        animation: 'textGradient 3s infinite alternate',
      }}
    >
      Registration Page
    </div>
        <label className="block mb-4">
          Name:
          <input
            type="text"
            placeholder="username"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="mt-1 p-2 border w-full rounded-md"
          />
        </label>
        <label className="block mb-4">
          Email:
          <input
            type="text"
            placeholder="email"
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="mt-1 p-2 border w-full rounded-md"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            placeholder="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="mt-1 p-2 border w-full rounded-md"
          />
        </label>
        <div className="mt-4 flex justify-center">
          <button
            type="submit"
            className="text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br hover:text-pink-400 focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all duration-300 transform hover:translate-x-[-5px]"
          >
            Register
          </button>
        </div>

        <div className="mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500">
            Login here
          </Link>
        </div>
      </form>

      </div>
      
    </div>
  );
}
