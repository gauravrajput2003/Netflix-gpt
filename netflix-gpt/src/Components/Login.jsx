import React, { useState } from 'react'
import Header from './Header'

const Login = () => {
    const [issignin,setissignin]=useState(true);
    const HandleSignin=()=>{
setissignin(!issignin);
    }
  return (
    <div>
        <Header/>
        <div className='absolute'>
        <img className='w-full' src='https://assets.nflxext.com/ffe/siteui/vlv3/aa9edac4-a0e6-4f12-896e-32c518daec62/web/IN-en-20241223-TRIFECTA-perspective_1502c512-be5f-4f14-b21a-e3d75fe159ab_small.jpg' alt='netflix'/>
    </div>
    <div className='py-36 rounded-lg'>
    <form className=' w-3/12 relative p-12 bg-black mx-auto left-0 right-0  text-white rounded-lg bg-opacity-80   '>
    <h1 className='font-bold text-3xl'>{issignin?"Sign In":"Sign Up"}</h1>

  { !issignin && (
      <>
          <input type='text' placeholder='enter full  name' className='p-4 my-4 w-full bg-gray-600 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 ease-in-out'/>
           
      </>
  ) }
      <input type='email' placeholder='enter email address'className='p-4 my-4 w-full bg-gray-600 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 ease-in-out'/>
      <input type='password' placeholder='enter password' className='p-4 my-4 w-full bg-gray-600 focus:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-white transition duration-300 ease-in-out'/>
    <button className='p-4 my-6 w-full bg-red-800 rounded-lg font-bold text-[20px]'>{issignin?"Sign In":"Sign Up"}</button>
     <h1 className='font-bold cursor-pointer  ' onClick={HandleSignin}>{issignin?"New to Netflix? sign up Now":"Already registered? Sign In Now"}</h1>
    </form>
    </div>
        </div> 
  );
};

export default Login