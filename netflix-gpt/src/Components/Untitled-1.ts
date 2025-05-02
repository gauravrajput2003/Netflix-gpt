import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTION } from "../assets/Contsant";
// Update this import to match the actual name in Movieslice.js
import { addNowPlaying } from "../assets/Movieslice";

const useNowPlaying = () => {
  const dispatch = useDispatch();
  const nowPlayingMovies = useSelector((store) => store.movies.nowPlayingMovies);

  const getNowPlaying = async (retryCount = 0) => {
    try {
      // Return if we already have movies or exceeded retries
      if (nowPlayingMovies || retryCount > 3) return;
      
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?page=1", 
        API_OPTION
      );
      
      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }
      
      const data = await response.json();
      // Update this to match the action name
      dispatch(addNowPlaying(data.results));
    } catch (error) {
      console.error("Fetch error:", error);
      
      // Wait and retry with exponential backoff
      if (retryCount < 3) {
        const delay = Math.pow(2, retryCount) * 1000; // 1s, 2s, 4s
        console.log(`Retrying in ${delay/1000}s... (Attempt ${retryCount + 1}/3)`);
        
        setTimeout(() => {
          getNowPlaying(retryCount + 1);
        }, delay);
      }
    }
  };

  useEffect(() => {
    getNowPlaying();
  }, []);
};

export default useNowPlaying;