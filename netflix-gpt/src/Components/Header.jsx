import { signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { auth} from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { addUser,removeUser } from '../assets/userSlice';
import { LOGO_URL } from '../assets/Contsant';

const Header = () => {
  const user = useSelector((store) => store.user); // Access user state from Redux store
  const navigate = useNavigate();
   const dispatch=useDispatch();
  

  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth,(user)=>{
      if(user){
        //sign in case from store->if user sign this will executed
        const {uid,email,displayName,photoURL}=user; 
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL})); 
        //update my store
        //navigate to browse pahe if user login succesfully
      navigate("/browse");
      }
      else{
        //sign out case from store if sign out thi swil exectued
        dispatch(removeUser());
        navigate("/");
        //navigate to main page
       
      }
    })
    return ()=>unsubscribe();
    },[]);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        // Redirect to login page on successful sign-out
      })
      .catch((error) => {
        console.error("Error signing out:", error);
        navigate("/error"); // Redirect to error page on failure
      });
  };

  return (
    <div className="absolute px-8 py-2 bg-gradient-to-b from-black to-transparent z-10 w-screen flex justify-between">
      <img
        className="w-48 drop-shadow-lg bg-opacity-80 p-2 rounded-md"
        src={LOGO_URL}
        alt="logo"
      />
      {user &&(
        <div className="flex items-center space-x-4">
        <div className="flex p-4 items-center">
          {user?.photoURL ? (
            <img
              className="h-[80px] w-[70px] my-[20px] rounded-full"
              alt="user-icon"
              src={user.photoURL}
            />
          ) : (
            <div className="h-[80px] w-[70px] my-[20px] rounded-full bg-gray-500 flex items-center justify-center text-white">
              ?
            </div>
          )}
          <button
            onClick={handleSignout}
            className="h-[80px] w-[100px] my-[20px] text-2xl text-red rounded-lg bg-transparent hover:bg-red-700 font-semibold py-2 px-4 border border-white hover:border-transparent focus:outline-none focus:ring-2 focus:ring-gray-700 ml-4 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
      )}
      
    </div>
  );
};

export default Header;
