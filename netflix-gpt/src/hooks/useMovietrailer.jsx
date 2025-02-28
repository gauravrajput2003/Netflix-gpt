import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrailerVideo } from '../assets/Movieslice';
import { API_OPTION } from '../assets/Contsant';

const useMovietrailer = (movieId) => {
  const dispatch = useDispatch();

  const getMovieVideos = async () => {
    try {
      if (!movieId) {
        console.warn('No movie ID provided');
        return;
      }

      console.log('Fetching trailer for movie ID:', movieId);
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}/videos`,
        API_OPTION
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      console.log('Video API Response:', json);

      if (!json.results || json.results.length === 0) {
        console.warn('No videos found for movie');
        return;
      }

      // First try to find an official trailer
      const trailer = json.results.find(video => 
        video.type === "Trailer" && video.official && video.site === "YouTube"
      ) || json.results[0];

      console.log('Selected trailer:', trailer);
      
      if (trailer?.key) {
        dispatch(addTrailerVideo(trailer));
      } else {
        console.warn('No valid trailer found');
      }
    } catch (error) {
      console.error('Error fetching trailer:', error);
    }
  };

  useEffect(() => {
    getMovieVideos();
    // Cleanup function
    return () => {
      dispatch(addTrailerVideo(null));
    };
  }, [movieId]);
};

export default useMovietrailer;