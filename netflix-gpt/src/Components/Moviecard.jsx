import React from "react";
import { TMDB_IMG_URL } from "../assets/Contsant";

const MovieCard = ({ movie, onClick }) => {
  if (!movie.poster_path) return null;

  return (
    <div 
      className="w-36 md:w-48 pr-4 hover:scale-110 transition-transform duration-300 cursor-pointer"
      onClick={() => onClick(movie)}
    >
      <img
        alt={movie.title}
        className="rounded-lg"
        src={TMDB_IMG_URL + movie.poster_path}
      />
    </div>
  );
};

export default MovieCard;