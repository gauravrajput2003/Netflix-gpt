import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {  addUpcomingMovies } from '../assets/Movieslice';
import { API_OPTION } from '../assets/Contsant';

const useUpcomig = () => {
  const dispatch = useDispatch();

  const getUpcomingMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/upcoming?page=1", API_OPTION);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
     // console.log('Top Rated Movies:', json.results); // Debugging
      dispatch(addUpcomingMovies(json.results));
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };
  

  useEffect(() => {
    getUpcomingMovies();
  }, [dispatch]);
};

export default useUpcomig;