import { useRef } from 'react';
import lang from '../utils/languageConstant'
import { useDispatch, useSelector } from 'react-redux'
import ai from '../utils/gemeniAI';
import { API_OPTIONS } from '../utils/constant';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
  const langKey = useSelector(store => store.config.lang);
  const searchText = useRef(null);
  const dispatch = useDispatch();

  const searchMovieTMDB = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
      movie +
      "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();

    return json.results;
  };

  const handleGptSearchClick = async () => {

    // console.log(searchText.current.value);

    // Make an API call to gemeni API and get Movie Results
    const gptQuery =
      "Act as a Movie Recommendation system and suggest some movies for the query : " +
      searchText.current.value +
      ". only give me names of 5 movies, comma seperated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    const gptResults = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: gptQuery,
    });
    // console.log(gptResults);
    // console.log(gptResults.candidates?.[0]?.content?.parts[0]?.text);

    if (!gptResults.candidates) {
      // TODO: Write Error Handling
    }

    const gptMovies = gptResults.candidates?.[0]?.content?.parts[0]?.text.split(",");
    // console.log(gptMovies);

    // For each movie it will search TMDB API
    const promiseArray = gptMovies.map((movie) => searchMovieTMDB(movie));
    // [Promise, Promise, Promise, Promise, Promise]

    const tmdbResults = await Promise.all(promiseArray);
    // console.log(tmdbResults);

    dispatch(addGptMovieResult({ movieNames: gptMovies, movieResults: tmdbResults }));
  };

  return (
    <div className='pt-[8%] flex justify-center'>
      <form className='w-[50%] py-1 bg-black flex gap-4 items-center justify-center' onClick={e => e.preventDefault()}>
        <input ref={searchText} className='w-[72%] p-4 m-1 bg-white text-black rounded' type="text" placeholder={lang[langKey].gptSearchPlaceholder} />
        <button onClick={handleGptSearchClick} className='py-4 px-16 rounded bg-red-600 text-white'>{lang[langKey].search}</button>
      </form>
    </div>
  )
}

export default GptSearchBar;