import React from 'react';
import { useSelector } from 'react-redux';
import Videotitle from './Videotitle';
import Videobackground from './Videobackground';

const Maincontainer = () => {
  const movies = useSelector(store => store.movies?.nowPlayingMovie);

  // Early return if movies is null or empty
  if (!movies || movies.length === 0) return null;

  const mainMovie = movies[0];
  const { original_title, overview,id } = mainMovie;

  return (
    <div className='relative'>
      <Videotitle title={original_title} overview={overview} />
      <Videobackground movie_id={id} />
    </div>
  );
};

export default Maincontainer;