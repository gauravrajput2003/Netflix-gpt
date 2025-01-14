import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addPlayingMovie } from '../assets/Movieslice';
import { API_OPTION } from '../assets/Contsant';

const useNowPlaying = () => {
  const dispatch = useDispatch();

  const getNowPlaying = async () => {
    try {
      const response = await fetch("https://api.themoviedb.org/3/movie/now_playing?page=1", API_OPTION);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      // console.log(json.results);
      dispatch(addPlayingMovie(json.results));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    getNowPlaying();
  },);
};

export default useNowPlaying;