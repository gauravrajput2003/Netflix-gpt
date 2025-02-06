import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailervideo } from '../assets/Movieslice';
import { API_OPTION } from '../assets/Contsant';

const useMovietrailer = (movie_id) => {
  const dispatch = useDispatch();
  const trailerVideo=useSelector((store)=>store.movies.trailerVideo);
  const getVideo = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, API_OPTION);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
     
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[1] : json.results[1];
      dispatch(addTrailervideo(trailer));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    if (movie_id) {
     !trailerVideo && getVideo();
    }
  }, [movie_id]);
};

export default useMovietrailer;