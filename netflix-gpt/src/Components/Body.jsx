import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Login from './Login';
import Browse from './Browse';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../assets/userSlice';

// Get the base URL from import.meta.env or default to '/'
const BASE_URL = import.meta.env.BASE_URL || '/';

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const serializableUser = {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          emailVerified: user.emailVerified
        };
        
        dispatch(addUser(serializableUser));
        navigate('/browse');  // Remove the BASE_URL here
      } else {
        dispatch(removeUser());
        navigate('/');  // Remove the BASE_URL here
      }
    });

    return () => unsubscribe();
  }, [dispatch, navigate]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/browse" element={<Browse />} />
        {/* Add routes with the base URL prefix */}
        <Route path="/Netflix-gpt/" element={<Login />} />
        <Route path="/Netflix-gpt/browse" element={<Browse />} />
      </Routes>
    </div>
  );
};

export default Body;