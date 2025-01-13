import React from 'react'
import Movielist from './Movielist'
import { useSelector } from 'react-redux'

const Secondarycontainer = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovie);
  return (
    <div className='bg-black' > 
    <div className='-mt-52  relative z-20 ' >
      <Movielist title={"now playing "} movies={movies}/>
      <Movielist title={"Trending"} movies={movies}/>
      <Movielist title={"Popular Movies "} movies={movies}/>
      <Movielist title={"Recommended "} movies={movies}/>
      </div>
      
    </div>
  )
}

export default Secondarycontainer