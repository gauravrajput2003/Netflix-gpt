import React from 'react'

const Videotitle = ({title,overview}) => {
  return (
    <div className=' w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r to-black '>
        
        <h1 className='font-bold text-6xl'>{title}</h1>
        <h6 className='py-6 text-lg w-1/2'>{overview}</h6>
        <div >
            <button className='bg-white text-black  p-4 px-10 text-2xl rounded-lg font-bold shadow-lg hover:bg-opacity-60 transition duration-300 ease-in-out'>
            ▶️play
            </button>
            <button className='bg-white text-black  p-4 mx-5 text-2xl rounded-lg font-bold shadow-lg hover:bg-opacity-80   transition duration-300 ease-in-out'>
        ℹ️More Info
            </button>
      
      
        </div>
    </div>
  )
}

export default Videotitle