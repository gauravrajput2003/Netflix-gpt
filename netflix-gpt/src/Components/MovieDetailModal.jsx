import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaPlay, FaTimes } from "react-icons/fa";
import { TMDB_IMG_URL } from "../assets/Contsant";
import { API_OPTION } from "../assets/Contsant";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../assets/Movieslice";

const MovieDetailModal = ({ movie, onClose }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  // Add ESC key support to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    // Add event listener
    window.addEventListener("keydown", handleEscKey);
    
    // Prevent scrolling on body
    document.body.style.overflow = "hidden";
    
    // Cleanup function
    return () => {
      window.removeEventListener("keydown", handleEscKey);
      document.body.style.overflow = "auto";
      dispatch(addTrailerVideo(null));
    };
  }, [onClose, dispatch]);

  // Fetch trailer
  useEffect(() => {
    const getMovieVideos = async () => {
      try {
        if (!movie?.id) return;
        
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}/videos`,
          API_OPTION
        );
        const data = await response.json();
        
        // Find the trailer
        const trailers = data.results?.filter(video => 
          video.type === "Trailer" || video.type === "Teaser"
        );
        
        const trailer = trailers?.length ? trailers[0] : data.results?.[0];
        if (trailer) {
          dispatch(addTrailerVideo(trailer));
        }
      } catch (error) {
        console.error("Error fetching trailer:", error);
      }
    };
    
    getMovieVideos();
  }, [movie?.id, dispatch]);

  // Click outside to close
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!movie) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleBackdropClick}
    >
      <div className="relative bg-zinc-900 w-full max-w-5xl rounded-lg shadow-xl overflow-hidden">
        {/* Enhanced close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-[200] text-white bg-red-600 hover:bg-red-700 p-2 rounded-full transition-all duration-200 transform hover:scale-110 shadow-lg"
          aria-label="Close"
        >
          <FaTimes size={24} />
        </button>

        {/* Trailer or backdrop */}
        <div className="relative w-full aspect-video">
          {trailerVideo && trailerVideo.key ? (
            <div className="relative w-full h-full">
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=0&controls=1&showinfo=0&rel=0&modestbranding=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
              
              {/* Additional close button overlaid on video */}
              {/* <button 
                onClick={onClose}
                className="absolute bottom-4 right-4 z-[150] text-white bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-lg"
              >
                <FaTimes size={16} />
                <span>Close Trailer</span>
              </button> */}
            </div>
          ) : (
            <img
              src={`${TMDB_IMG_URL}${movie.backdrop_path || movie.poster_path}`}
              alt={movie.title || movie.name}
              className="w-full aspect-video object-cover"
            />
          )}
        </div>

        {/* Movie details */}
        <div className="p-6">
          <h1 className="text-3xl font-bold text-white mb-2">
            {movie.title || movie.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="text-green-500">{Math.round(movie.vote_average * 10)}% Match</span>
            <span className="text-gray-400">{movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}</span>
            {movie.adult && <span className="px-2 py-1 border border-gray-400 text-xs text-gray-400 rounded">18+</span>}
          </div>
          
          <p className="text-gray-200 mb-4">{movie.overview}</p>
          
          <div className="flex gap-3">
            <button className="flex items-center gap-2 bg-white hover:bg-opacity-80 text-black px-6 py-2 rounded-lg font-semibold transition">
              <FaPlay size={18} /> 
              <span>Play</span>
            </button>
            {/* <button 
              onClick={onClose}
              className=" my-2 flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg font-semibold transition "
            >
              <FaTimes size={18} />
              <span>Close</span>
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;