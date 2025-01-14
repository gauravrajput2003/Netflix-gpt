import React from 'react';
import { useSelector } from 'react-redux';
import Movielist from './Movielist';

const Secondarycontainer = () => {
  const nowPlayingMovies = useSelector(store => store.movies?.nowPlayingMovie);
  const popularMovies = useSelector(store => store.movies?.popularMovies); // Fixed naming
  const topRatedMovies = useSelector(store => store.movies?.topratedMovies);
  const upcomingMovies = useSelector(store => store.movies?.upcomingMovies);


  //console.log('Popular Movies:', popularMovies); // Debugging

  return (
    <div className='bg-black'>
      <div className='-mt-52 relative z-20 py-20'>
        <Movielist title={"Now Playing"} movies={nowPlayingMovies} />
        <Movielist title={"Popular Movies"} movies={popularMovies} />
        <Movielist title={"Top Rated Movies"} movies={topRatedMovies} />
        <Movielist title={"Upcoming Movies"} movies={upcomingMovies} />
      </div>
    </div>
  );
};

export default Secondarycontainer;
