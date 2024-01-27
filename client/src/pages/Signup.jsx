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
import React from 'react';
import { useState } from 'react';

export default function Register() {
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    
  });

  const registerUser = (e) => {
    e.preventDefault();
    
  }

  return (
    <div>
      <form onSubmit={registerUser}>
        <label>Name</label>
        <input type="text" placeholder="username" value={data.name} onChange={(e) => setData({...data, name: e.target.value})} />
        <label>Email</label>
        <input type="text" placeholder="email" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
        <label>Password</label>
        <input type="password" placeholder="password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <input type="password" placeholder="confirm password" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
        <button type='submit'>Register</button>
      </form>
    </div>
  )
}