import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMoviessuggestions from './GptMoviessuggestions'
import { BG_URL } from '../assets/Contsant'

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10 bg-fixed">
        <img
          className="w-full"
          src={BG_URL}
          alt="Netflix background"
        />
      </div>

<GptSearchBar/>
<GptMoviessuggestions/>
    </div>
  )
}

export default GptSearch