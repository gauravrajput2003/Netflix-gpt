import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../Firebase';
import { useDispatch } from 'react-redux';
import { addUser,removeUser} from '../assets/userSlice';

const Body = () => {

 
const approute=createBrowserRouter([
  {
    path:"/",
    element:<Login/>,
  },
  {
    path:"/browse",
    element: (
 
        <Browse />
      
    ),
  },
]);
//we use effect here because we want setup only once 


  return (
    <div>
    <RouterProvider router={approute} />

    </div>
  )
}

export default Body