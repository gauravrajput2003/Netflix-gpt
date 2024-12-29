import React, { useEffect } from 'react'
import Login from './Login'
import Browse from './Browse'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../Firebase';

const Body = () => {
 
const approute=createBrowserRouter([
  {
    path:"/",
    element:<Login/>,
  },
  {
    path:"/browse",
    element:<Browse/>,
  },
]);
useEffect(()=>{
onAuthStateChanged(auth,(user)=>{
  if(user){
    const {uid,email,displayName}=user.uid; 
  }
  else{
    
  }
})
},[])

  return (
    <div>
    <RouterProvider router={approute} />

    </div>
  )
}

export default Body