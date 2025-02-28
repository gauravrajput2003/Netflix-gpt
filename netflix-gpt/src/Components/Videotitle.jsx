import React from 'react';
import { FaPlay, FaInfoCircle } from 'react-icons/fa';

const Videotitle = ({title, overview}) => {
  return (
    <div className='absolute w-screen aspect-video pt-[20%] px-24 bg-gradient-to-r from-black'>
      <div className='w-1/2'>
        <h1 className='text-white font-bold text-6xl mb-4'>{title}</h1>
        <p className='text-white text-lg mb-6 line-clamp-3'>{overview}</p>
        <div className='flex gap-3'>
          <button 
            className='flex items-center bg-white text-black p-4 px-8 
              text-xl rounded-lg hover:bg-opacity-80 transition-all'
          >
            <FaPlay className="mr-2" />
            Play
          </button>
          <button 
            className='flex items-center bg-gray-500 text-white p-4 px-8 
              text-xl rounded-lg bg-opacity-50 hover:bg-opacity-70 transition-all'
          >
            <FaInfoCircle className="mr-2" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Videotitle;