import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkvalidData } from '../assets/Validate';
import {  createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../Firebase';


const Login = () => {
  const [issignin, setIssignin] = useState(true);
  const [errorMsg, setErrorMsg] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const email = useRef(null);
  const password = useRef(null);

  const handleSignin = () => {
    setIssignin(!issignin);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const msg = checkvalidData(email.current.value, password.current.value);
    setErrorMsg(msg);
    if (Object.keys(msg).length != 0) return;
    //proceed further
    if(!issignin){
      //signup logic
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
      .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg({ general: errorCode + " - " + errorMessage })
        // ..
      });
    }
    else{
      //sigin logic
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    
    const user = userCredential.user;
    // ...
    alert('sign in successfull')
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMsg({ general: errorCode + " - " + errorMessage })
  });
    }
  
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle password visibility
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img className='w-full' src='https://assets.nflxext.com/ffe/siteui/vlv3/aa9edac4-a0e6-4f12-896e-32c518daec62/web/IN-en-20241223-TRIFECTA-perspective_1502c512-be5f-4f14-b21a-e3d75fe159ab_small.jpg' alt='netflix' />
      </div>
      <div className='py-36 rounded-lg'>
        <form className='w-3/12 relative p-12 bg-black mx-auto left-0 right-0 text-white rounded-lg bg-opacity-80' onSubmit={handleSubmit}>
          <h1 className='font-bold text-3xl'>{issignin ? "Sign In" : "Sign Up"}</h1>
          { !issignin && (
            <>
              <input type='text' placeholder='enter full name' className='p-4 my-4 w-full bg-gray-600 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 ease-in-out' />
            </>
          )}
          <input
            type="email"
            placeholder="Enter email address"
            ref={email}
            className="p-4 my-4 w-full bg-gray-600 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          {errorMsg.email && <p className="text-red-500 text-lg font-bold">{errorMsg.email}</p>}
          <div className="relative ">
            <input 
              ref={password} 
              type={passwordVisible ? 'text' : 'password'} 
              placeholder='enter password' 
              className='p-4 my-4 w-full bg-gray-600 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 ease-in-out' 
            />
        
            <button 
              type="button" 
              onClick={togglePasswordVisibility} 
              className="absolute right-4 top-4 text-white text-lg font-bold  "
            >
              {passwordVisible ? '👁️' : '👁️'}
            </button>
          </div>
          {errorMsg.password && <p className="text-red-500 text-lg font-bold">{errorMsg.password}</p>}
          {errorMsg.general && (
        <p className="text-red-500 text-lg font-bold my-2">{errorMsg.general}</p>
      )}
      
          
          <button type="submit" className="p-4 my-6 w-full bg-red-800 rounded-lg font-bold text-[20px]">
            {issignin ? "Sign In" : "Sign Up"}
          </button>
          <h1 className="font-bold cursor-pointer" onClick={handleSignin}>
            {issignin ? "New to Netflix? Sign up" : "Already have an account? Sign in"}
          </h1>
        </form>
      </div>
    </div>
  );
};

export default Login;