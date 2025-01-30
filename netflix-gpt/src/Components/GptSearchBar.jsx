import React from 'react';
import lang from '../assets/LangaugeConstant';
import { useSelector } from 'react-redux';

const GptSearchBar = () => {
  const langkey=useSelector((store)=>store.config.lang);
  const languageData = lang[langkey] || lang['en'];
  return (
    <div className='pt-[10%] flex justify-center'>
      <form className='w-1/2 bg-black grid grid-cols-12'>
        <input 
          type='text'
          className='p-4 m-4 col-span-9 focus:w-4/5 transition-all 
          focus:border-blue-700-2 duration-300 font-bold text-2xl' 
          placeholder={lang[langkey].gptSearchplaceholder} 
          style={{ position: 'relative', zIndex: 1 }}
        />
        <button 
          className='col-span-3 rounded-lg bg-red-700 text-white py-2 px-4 m-4 hover:bg-red-800 font-bold text-2xl' 
          style={{ position: 'relative', zIndex: 0 }}
        >
          {languageData.search}
        </button>
      </form>
    </div>
  );
}

export default GptSearchBar;
