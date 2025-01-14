import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTopratedMovies } from '../assets/Movieslice';
import { API_OPTION } from '../assets/Contsant';

const usetopratedMovies = () => {
  const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?page=1", API_OPTION);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
     // console.log('Top Rated Movies:', json.results); // Debugging
      dispatch(addTopratedMovies(json.results));
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };
  

  useEffect(() => {
    getTopRatedMovies();
  }, [dispatch]);
};

export default usetopratedMovies;