import React, { useEffect } from 'react';
import { API_OPTION } from '../assets/Contsant';
import { useDispatch, useSelector } from 'react-redux';
import { addTrailervideo } from '../assets/Movieslice';
import useMovietrailer from '../hooks/useMovietrailer';

const Videobackground = ({ movie_id }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  useMovietrailer(movie_id);
  // const dispatch = useDispatch();

  // const getVideo = async () => {
  //   try {
  //     const response = await fetch(`https://api.themoviedb.org/3/movie/${movie_id}/videos?language=en-US`, API_OPTION);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const json = await response.json();
  //     console.log(json);
  //     const filterData = json.results.filter((video) => video.type === "Trailer");
  //     const trailer = filterData.length ? filterData[0] : json.results[0];
  //     dispatch(addTrailervideo(trailer));
  //   } catch (error) {
  //     console.error('Fetch error:', error);
  //   }
  // };

  // useEffect(() => {
  //   if (movie_id) {
  //     getVideo();
  //   }
  // }, [movie_id]);

  return (
    <div>
      {trailerVideo ? (
        <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerVideo.key}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        ></iframe>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Videobackground;