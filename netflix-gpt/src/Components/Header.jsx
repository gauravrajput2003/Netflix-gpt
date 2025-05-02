import { signOut } from 'firebase/auth';
import React, { useEffect } from 'react';
import { auth } from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../assets/userSlice';
import { LOGO_URL, NEW_LOGO, Photo_Url, SUPPORTED_LANG } from '../assets/Contsant';
import { toggleGptSearchView } from '../assets/gptslice';
import { changeLangauge } from '../assets/configslice';

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptsearch = useSelector((store) => store.gpt.showGptsearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(addUser({ uid, email, displayName, photoURL: Photo_Url }));
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

  const handleGptButton = () => {
    dispatch(toggleGptSearchView());
  };

  const changelang = (event) => {
    const selectedLang = event.target.value;
    dispatch(changeLangauge(selectedLang));
  };

  return (
    <div className="fixed w-full px-4 md:px-8 z-50 flex flex-col sm:flex-row sm:justify-between items-center bg-gradient-to-b from-black to-transparent space-y-2 sm:space-y-0 py-2">
      <img
        className="w-36 md:w-44 drop-shadow-lg bg-opacity-80 p-2 rounded-md cursor-pointer"
        
      
      />
      {user && (
        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4">
          {showGptsearch && (
            <select
              className="p-2 bg-gray-900 text-white font-mono"
              onChange={changelang}
            >
              {SUPPORTED_LANG.map((lang) => (
                <option key={lang.identifier} value={lang.identifier}>
                  {lang.name}
                </option>
              ))}
            </select>
          )}
          <button
            className="bg-purple-800 text-white rounded-lg px-4 py-2"
            onClick={handleGptButton}
          >
            {showGptsearch ? "Home" : "Gpt Search"}
          </button>
          <div className="flex items-center space-x-2">
            <img
              className="h-10 w-10 rounded-full"
              alt="user-icon"
              src={Photo_Url}
            />
            <button
              onClick={handleSignout}
              className="text-white bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
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
