import React from 'react';
import { useSelector } from 'react-redux';
import Movielist from './Movielist';

const GptMoviessuggestions = () => {
  const { MoviesRes, tmdbMovies } = useSelector((store) => store.gpt);
  if (!tmdbMovies || tmdbMovies.length === 0) return <p className="text-white"></p>;
  return (
    <div className='p-4 m-4 bg-black text-white bg-opacity-70'>
      <div>
        {tmdbMovies.map((movieList, index) => (
          <Movielist key={index} title={`Suggestions for ${MoviesRes[index]}`} movies={movieList} />
        ))}
      </div>
    </div>
  );
};
export default GptMoviessuggestions;