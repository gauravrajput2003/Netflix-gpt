import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { FaPlay, FaInfoCircle, FaTimes } from "react-icons/fa";
import { TMDB_IMG_URL } from "../assets/Contsant";
import { API_OPTION } from "../assets/Contsant";
import { useDispatch } from "react-redux";
import { addTrailerVideo } from "../assets/Movieslice";

const MovieDetailModal = ({ movie, onClose }) => {
  const dispatch = useDispatch();
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  // Move the fetch trailer logic directly into this component
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
    
    // Cleanup: you might want to clear the trailer when modal closes
    return () => {
      dispatch(addTrailerVideo(null));
    };
  }, [movie?.id, dispatch]);

  if (!movie) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="relative bg-zinc-900 w-full max-w-5xl rounded-lg shadow-xl overflow-hidden">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 z-10 text-white bg-black bg-opacity-50 p-2 rounded-full"
        >
          <FaTimes size={20} />
        </button>

        {/* Trailer or backdrop */}
        <div className="relative w-full aspect-video">
          {trailerVideo && trailerVideo.key ? (
            <iframe
              className="w-full aspect-video"
              src={`https://www.youtube.com/embed/${trailerVideo.key}?autoplay=1&mute=0`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
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
            <button className="flex items-center gap-2 bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded-lg font-semibold transition">
              <FaInfoCircle size={18} />
              <span>More Info</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailModal;