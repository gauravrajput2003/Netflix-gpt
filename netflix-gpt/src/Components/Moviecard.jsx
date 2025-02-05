import React from 'react';
import { IMG_CDN_URL } from '../assets/Contsant';

const Moviecard = ({ posterPath }) => {
  if(!posterPath)return null;
  return (
    <div className="w-64 h- flex-shrink-0"> {/* Increased dimensions */}
      <div className="relative">
        <img
          alt="movies"
          src={IMG_CDN_URL + posterPath}
          className="w-full h-full object-cover rounded-lg shadow-lg cursor-pointer"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white text-center py-4 rounded-b-lg">
          <p className="text-lg font-semibold"></p>
        </div>
      </div>
    </div>
  );
};

export default Moviecard;
