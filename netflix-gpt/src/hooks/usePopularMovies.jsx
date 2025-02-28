import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPopularMovies } from '../assets/Movieslice';
import { API_OPTION } from '../assets/Contsant';

const usePopularMovies = () => {
  const dispatch = useDispatch();
  const popularMovies=useSelector((store)=>store.movies.popularMovies);

  const getPopularMovies = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/popular?page=1", API_OPTION);
      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const json = await response.json();
      // console.log('Popular Movies:', json.results); // Debugging
      dispatch(addPopularMovies(json.results));
    } catch (error) {
      console.error('Fetch error:', error.message);
    }
  };
  

  useEffect(() => {
    !popularMovies && getPopularMovies();
  },);
};

export default usePopularMovies;