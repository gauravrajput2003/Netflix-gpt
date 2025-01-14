import React from 'react';
import Header from './Header';
import useNowPlaying from '../hooks/useNowPlaying';
import Maincontainer from './maincontainer';
import Secondarycontainer from './Secondarycontainer';
import usePopularMovies from '../hooks/usePopularMovies';
import usetopratedMovies from '../hooks/usetopratedMovies';
import useUpcomig from '../hooks/useUpcomig';


const Browse = () => {
  useNowPlaying();
  usePopularMovies();
  usetopratedMovies();
  useUpcomig();

  return (
    <div className='relative'>
      <Header />
      <Maincontainer />
      <Secondarycontainer/>
    </div>
  );
};

export default Browse;