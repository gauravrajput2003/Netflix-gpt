import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkvalidData } from '../assets/Validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../Firebase';
import { useDispatch } from 'react-redux';
import { addUser,removeUser } from '../assets/userSlice';
import { BG_URL, Photo_Url } from '../assets/Contsant';


const Login = () => {
  const [issignin, setIssignin] = useState(true);
  const [errorMsg, setErrorMsg] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [photoURL, setPhotoURL] = useState(null); // State to store photo URL
  const email = useRef(null);
  const name = useRef(null);
  const dispatch=useDispatch();
  const password = useRef(null);

  const handleSignin = () => setIssignin(!issignin);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const msg = checkvalidData(email.current.value, password.current.value);
    setErrorMsg(msg);

    if (Object.keys(msg).length !== 0) return;

    setIsLoading(true);
    try {
      let user = null;

      if (!issignin) {
        // Sign-up logic
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        user = userCredential.user;

        // Update profile
        await updateProfile(user, {
          displayName: name.current.value,
          photoURL: Photo_Url,
        }).then(()=>{
          const {uid,email,displayName,photoURL}=auth.currentUser; 
              dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL})); 
        });

        alert("Sign up success, please sign in");
      } else {
        // Sign-in logic
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email.current.value,
          password.current.value
        );

        user = userCredential.user;
      }

      // Set the photoURL in state
      setPhotoURL(user.photoURL || "https://avatars.githubusercontent.com/u/138980732?v=4");

      // Navigate to browse after successful sign-up or sign-in
    } catch (error) {
      setErrorMsg({ general: `${error.code} - ${error.message}` });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);

  return (
    <div>
      <Header photoURL={photoURL} /> {/* Pass photoURL to Header */}
      <div className="absolute">
        <img
          className="w-full"
          src={BG_URL}
          alt="Netflix background"
        />
      </div>
      <div className="py-36 rounded-lg">
        <form
          className="w-3/12 relative p-12 bg-black mx-auto text-white rounded-lg bg-opacity-80"
          onSubmit={handleSubmit}
        >
          <h1 className="font-bold text-3xl">{issignin ? "Sign In" : "Sign Up"}</h1>
          {!issignin && (
            <input
              ref={name}
              type="text"
              placeholder="Enter full name"
              className="p-4 my-4 w-full bg-gray-600 focus:bg-black focus:outline-none focus:ring-2 focus:ring-blue-700 transition duration-300 ease-in-out"
            />
          )}
          <input
            type="email"
            placeholder="Enter email address"
            ref={email}
            onFocus={(e) => e.target.placeholder = ""}
            onBlur={(e) => e.target.placeholder = "Enter email address"}
            className="p-4 my-4 w-full bg-gray-600 focus:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
          />
          {errorMsg.email && <p className="text-red-500 text-lg font-bold">{errorMsg.email}</p>}
          <div className="relative">
            <input
              ref={password}
              type={passwordVisible ? 'text' : 'password'}
              placeholder="Enter password"
              className="p-4 my-4 w-full bg-gray-600 focus:bg-black focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-4 top-4 text-white text-lg font-bold"
            >
              {passwordVisible ? '👁️' : '👁️'}
            </button>
          </div>
          {errorMsg.password && <p className="text-red-500 text-lg font-bold">{errorMsg.password}</p>}
          {errorMsg.general && <p className="text-red-500 text-lg font-bold my-2">{errorMsg.general}</p>}
          <button
            type="submit"
            className="p-4 my-6 w-full bg-red-800 rounded-lg font-bold text-[20px]"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : issignin ? "Sign In" : "Sign Up"}
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
