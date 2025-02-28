import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMoviessuggestions from './GptMoviessuggestions'
import { BG_URL } from '../assets/Contsant'

const GptSearch = () => {
  return (
    <div className="relative">
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <img
          className="w-full h-full object-cover"
          src={BG_URL}
          alt="Netflix background"
        />
      </div>
      <div className="relative z-20 pt-[10%]">
        <GptSearchBar/>
        <GptMoviessuggestions/>
      </div>
    </div>
  )
}

export default GptSearch