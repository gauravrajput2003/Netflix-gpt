import React, { useRef } from 'react';
import lang from '../assets/LangaugeConstant';
import { useDispatch, useSelector } from 'react-redux';
import { model } from '../assets/client';
import { API_OPTION } from '../assets/Contsant';
import { addGptmovies } from '../assets/gptslice';

const GptSearchBar = () => {
  const dispatch = useDispatch();
  const searchtext = useRef(null);
  const langkey = useSelector((store) => store.config.lang);
  const languageData = lang[langkey] || lang['en'];
  
  const SearchinTmdb = async (movie) => {
    const url = `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`;
    const data = await fetch(url, API_OPTION);
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    // Don't proceed if input is empty
    if (!searchtext.current.value.trim()) return;
    
    console.log(searchtext.current.value);

    const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query: " + searchtext.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example result: gadar, solay, Don, Koi Mil gaya, Phir Herra Pheri";
    
    try {
      // Show loading state (optional)
      dispatch(addGptmovies({ tmdbMovies: [], MoviesRes: [], isLoading: true }));
      
      const result = await model.generateContent(gptQuery);
      const gptMovies = result.response.text().split(",");
      console.log(gptMovies);

      const promiseArray = gptMovies.map((movies) => SearchinTmdb(movies.trim()));
      const tmdbRes = await Promise.all(promiseArray);
      console.log(tmdbRes);
      dispatch(addGptmovies({ tmdbMovies: tmdbRes, MoviesRes: gptMovies, isLoading: false }));
    } catch (error) {
      console.error('Error fetching data from Google Generative AI API:', error);
      // Show error state (optional)
      dispatch(addGptmovies({ tmdbMovies: [], MoviesRes: [], isError: true }));
    }
  };

  return (
    <div className="pt-[5%] md:pt-[8%] lg:pt-[10%] px-4 sm:px-6 md:px-8 flex justify-center">
      <form 
        className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] lg:max-w-[60%] bg-black bg-opacity-80 rounded-lg shadow-lg"
        onSubmit={(e) => { e.preventDefault(); handleGptSearch(); }}
      >
        <div className="flex flex-col sm:flex-row items-center p-2 sm:p-3">
          <input 
            ref={searchtext}
            type="text"
            className="w-full sm:flex-grow p-2 sm:p-3 md:p-4 text-base sm:text-lg md:text-xl rounded-lg mb-2 sm:mb-0 sm:mr-2 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder={languageData.gptSearchplaceholder}
            style={{ zIndex: 1 }}
          />
          <button 
            type="submit"
            className="w-full sm:w-auto rounded-lg bg-red-600 hover:bg-red-700 transition-colors text-white font-semibold py-2 px-4 sm:py-3 sm:px-5 text-base sm:text-lg md:text-xl"
            style={{ zIndex: 0 }}
          >
            {languageData.search}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GptSearchBar;