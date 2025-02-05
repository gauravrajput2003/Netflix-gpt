import React, { useRef } from 'react';
import lang from '../assets/LangaugeConstant';
import { useDispatch, useSelector } from 'react-redux';
import { model } from '../assets/client';
import { API_OPTION } from '../assets/Contsant';
import { addGptmovies } from '../assets/gptslice';

const GptSearchBar = () => {
  const dispatch=useDispatch();
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
  console.log(searchtext.current.value);
  const gptQuery = "Act as a Movie Recommendation System and suggest some movies for the query: " + searchtext.current.value + ". Only give me names of 5 movies, comma separated like the example result given ahead. Example result: gadar, solay, Don, Koi Mil gaya, Phir Herra Pheri";
  
  try {
    const result = await model.generateContent(gptQuery);
    const gptMovies = result.response.text().split(",");
    console.log(gptMovies);

    const promiseArray = gptMovies.map((movies) => SearchinTmdb(movies.trim()));
    const tmdbRes = await Promise.all(promiseArray);
    console.log(tmdbRes);
    dispatch(addGptmovies({tmdbMovies:tmdbRes,MoviesRes:gptMovies}));
  } catch (error) {
    console.error('Error fetching data from Google Generative AI API:', error);
  }
};

  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 bg-black grid grid-cols-12' onSubmit={(e) => { e.preventDefault(); handleGptSearch(); }}>
        <input 
          ref={searchtext}
          type='text'
          className='p-4 m-4 col-span-9 focus:w-4/5 transition-all 
          focus:border-blue-700-2 duration-300 font-bold text-2xl' 
          placeholder={languageData.gptSearchplaceholder} 
          style={{ position: 'relative', zIndex: 1 }}
        />
        <button 
          type='submit'
          className='col-span-3 rounded-lg bg-red-700 text-white py-2 px-4 m-4 hover:bg-red-800 font-bold text-2xl' 
          style={{ position: 'relative', zIndex: 0 }}
        >
          {languageData.search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;