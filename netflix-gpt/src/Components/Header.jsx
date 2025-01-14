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
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL }));
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleSignout = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.error("Error signing out:", error);
        navigate("/error");
      });
  };

  return (
    <div className="absolute  w-screen px-8  z-20 flex justify-between items-center bg-gradient-to-b from-black to-transparent ">
      <img
        className="w-44 drop-shadow-lg bg-opacity-80 p-2 rounded-md"
        src={LOGO_URL}
        alt="logo"
      />
      {user && (
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            {user?.photoURL ? (
              <img
                className="h-12 w-12 rounded-full"
                alt="user-icon"
                src={user.photoURL}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-5xl cursor-pointer">
                😎
              </div>
            )}
            <button
              onClick={handleSignout}
              className="ml-4 text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
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

