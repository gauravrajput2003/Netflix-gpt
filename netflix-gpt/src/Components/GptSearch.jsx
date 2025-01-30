import React from 'react'
import GptSearchBar from './GptSearchBar'
import GptMoviessuggestions from './GptMoviessuggestions'
import { BG_URL } from '../assets/Contsant'

const GptSearch = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img
          className="w-full"
          src={BG_URL}
          alt="Netflix background"
        />
      </div>
//gpt searchbar
//gpt movies suggestion
<GptSearchBar/>
<GptMoviessuggestions/>

    </div>
  )
}

export default GptSearch