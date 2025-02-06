import { signOut } from 'firebase/auth';
import React from 'react';
import { useEffect } from 'react';
import { auth} from '../../Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector ,useDispatch} from 'react-redux';
import { addUser,removeUser } from '../assets/userSlice';
import { LOGO_URL,NEW_LOGO,Photo_Url, SUPPORTED_LANG } from '../assets/Contsant';
import {toggleGptSearchView} from '../assets/gptslice';
import { changeLangauge } from '../assets/configslice';

const Header = () => {
  const user = useSelector((store) => store.user);
  const showGptsearch=useSelector((store)=>store.gpt.showGptsearch);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, Photo_Url } = user;
        dispatch(addUser({ uid, email, displayName, Photo_Url }));
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
  const handleGptButton=()=>{
    dispatch(toggleGptSearchView());
  }
  const changelang = (event) => {
    const selectedLang = event.target.value;
    dispatch(changeLangauge(selectedLang)); // ✅ Fix: Dispatch action to update Redux store
  };
 
  return (
    <div className="fixed  w-screen px-8  z-20 flex justify-between items-center bg-gradient-to-b from-black to-transparent ">
      <img   
        className="w-44 drop-shadow-lg bg-opacity-80 p-2 rounded-md cursor-pointer" 
        src={LOGO_URL      }
        alt="logo"
      />
      {user && (
        <div className="flex items-center space-x-4">
        { showGptsearch && <select className='p-2 bg-gray-900 text-white font-mono m-2' onChange={changelang}>
           {SUPPORTED_LANG.map((lang)=>(<option key={lang.identifier} value={lang.identifier}>{lang.name}</option>))}
          </select>}
          <button className='bg-purple-800 rounded-lg px-4 py-2 mx-2' onClick={handleGptButton}>{showGptsearch ? "Home":"Gpt Search"}</button>
          <div className="flex items-center">
            {user?. Photo_Url ? (
              <img
                className="h-12 w-12 rounded-full"
                alt="user-icon"
                src={user. Photo_Url}
              />
            ) : (
              <div className="h-12 w-12 rounded-full bg-gray-500 flex items-center justify-center text-white text-5xl cursor-pointer">
                
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

