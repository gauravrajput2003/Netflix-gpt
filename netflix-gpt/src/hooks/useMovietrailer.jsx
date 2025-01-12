import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTrailervideo } from '../assets/Movieslice';
import { API_OPTION } from '../assets/Contsant';

const useMovietrailer = (movie_id) => {
  const dispatch = useDispatch();

  const getVideo = async () => {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, API_OPTION);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const json = await response.json();
      console.log(json);
      const filterData = json.results.filter((video) => video.type === "Trailer");
      const trailer = filterData.length ? filterData[0] : json.results[0];
      dispatch(addTrailervideo(trailer));
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    if (movie_id) {
      getVideo();
    }
  }, [movie_id]);
};

export default useMovietrailer;