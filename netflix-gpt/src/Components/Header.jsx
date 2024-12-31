import { signOut } from 'firebase/auth';
import React from 'react';
import { auth } from '../../Firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const user = useSelector((store) => store.user); // Access user state from Redux store
  const navigate = useNavigate();

  const handleSignout = () => {
    signOut(auth)
      .then(() => {
        navigate("/"); // Redirect to login page on successful sign-out
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
        src="https://help.nflxext.com/helpcenter/OneTrust/oneTrust_production/consent/87b6a5c0-0104-4e96-a291-092c11350111/01938dc4-59b3-7bbc-b635-c4131030e85f/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
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
