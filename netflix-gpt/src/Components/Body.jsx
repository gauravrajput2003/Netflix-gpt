import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {onAuthStateChanged} from 'firebase/auth';
import { auth } from '../../Firebase';
import { useDispatch } from 'react-redux';
import { addUser,removeUser} from '../assets/userSlice';

const Body = () => {
 const dispatch=useDispatch();

 
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
useEffect(()=>{
onAuthStateChanged(auth,(user)=>{
  if(user){
    //sign in case from store->if user sign this will executed
    const {uid,email,displayName,photoURL}=user; 
    dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL})); 
    //update my store
    //navigate to browse pahe if user login succesfully
  
  }
  else{
    //sign out case from store if sign out thi swil exectued
    dispatch(removeUser());
    //navigate to main page
   
  }
})
},[]);

  return (
    <div>
    <RouterProvider router={approute} />

    </div>
  )
}

export default Body