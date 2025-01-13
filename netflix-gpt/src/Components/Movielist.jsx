import React from 'react';
import Moviecard from './Moviecard';

const Movielist = ({ title, movies }) => {
  if (!movies || movies.length === 0) return <p className="text-white">No movies available</p>;

  return (
    <div className="px-4 ">
      <h2 className="text-4xl py-6 text-white font-bold">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {movies.map(movie => (
          <Moviecard key={movie.id} posterPath={movie.poster_path} />
        ))}
      </div>
    </div>
  );
};

export default Movielist;
