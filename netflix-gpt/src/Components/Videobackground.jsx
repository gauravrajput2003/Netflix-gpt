import { useSelector } from 'react-redux';
import useMovietrailer from '../hooks/useMovietrailer';
import { FaPlay, FaInfoCircle } from 'react-icons/fa'; // Import icons

const Videobackground = ({ movie_id, title, overview }) => {
  const trailerVideo = useSelector(store => store.movies?.trailerVideo);
  useMovietrailer(movie_id);

  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="relative w-screen aspect-video -mt-20">
        {trailerVideo && trailerVideo.key ? (
          <iframe 
          
            className="w-screen aspect-video object-cover"
            src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&enablejsapi=1&loop=1&playlist=${trailerVideo.key}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <div className="w-screen aspect-video bg-black flex flex-col items-center justify-center">
            <div className="text-white text-xl mb-4">Loading video...</div>
            <div className="text-gray-400 text-sm">
              {!movie_id ? 'No movie selected' : 'Fetching trailer...'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Videobackground;