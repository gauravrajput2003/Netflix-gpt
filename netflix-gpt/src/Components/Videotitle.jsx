import React from 'react'

const Videotitle = ({title,overview}) => {
  return (
    <div className='pt-32 px-10'>
        
        <h1 className='font-bold text-6xl'>{title}</h1>
        <h6 className='py-6 text-lg w-1/2'>{overview}</h6>
        <div >
            <button className='bg-red-500 text-black  p-4 px-10 text-2xl rounded-lg shadow-lg hover:bg-red-900 transition duration-300 ease-in-out'>
            ▶️play
            </button>
            <button className='bg-red-500 text-black p-4 px-10 mx-4 text-2xl rounded-lg shadow-lg hover:bg-red-900 transition duration-300 ease-in-out'>
        More Info
            </button>
      
      
        </div>
    </div>
  )
}

export default Videotitle