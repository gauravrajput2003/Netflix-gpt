import { useSelector } from 'react-redux';
import useMovietrailer from '../hooks/useMovietrailer';

const Videobackground = ({ movie_id }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  useMovietrailer(movie_id);
  return (
    <div className="w-screen">
      {trailerVideo ? (
        <iframe className=' w-screen aspect-video'
          // width="560"
          // height="315"
 
          src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1`}
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