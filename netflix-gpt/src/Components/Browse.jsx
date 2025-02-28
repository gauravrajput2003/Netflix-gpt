import React from 'react';
import Header from './Header';
import useNowPlaying from '../hooks/useNowPlaying';
import Maincontainer from './maincontainer';
import Secondarycontainer from './Secondarycontainer';
import usePopularMovies from '../hooks/usePopularMovies';
import usetopratedMovies from '../hooks/usetopratedMovies';
import useUpcomig from '../hooks/useUpcomig';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';


const Browse = () => {
  useNowPlaying();
  usePopularMovies();
  usetopratedMovies();
  useUpcomig();
const gptSearch=useSelector((store)=>store.gpt.showGptsearch);
  return (
    <div className='relative'>
      <Header />
      {
        gptSearch?(      <GptSearch/>
        ):(<>
         <Maincontainer />
         <Secondarycontainer/>
        </>)
      }
     
    </div>
  );
};

export default Browse;