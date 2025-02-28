import React from 'react';
import Moviecard from './Moviecard';

const Movielist = ({ title, movies }) => {
  if (!movies || movies.length === 0) return <p className="text-white"></p>;

  return (
    <div className="px-0">
      <h2 className="text-4xl py-4 text-white font-bold bg-black">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {movies.map(movie => (
          <Moviecard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default Movielist;