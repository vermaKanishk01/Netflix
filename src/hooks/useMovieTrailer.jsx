import { useEffect } from 'react'
import { addTrailerVideo } from '../utils/movieSlice';
import { API_OPTIONS } from '../utils/constant';
import { useDispatch } from 'react-redux';

const useMovieTrailer = ({movieId}) => {

    const dispatch = useDispatch();

    // fetch trailer video && updating the store with trailer video data
    const getMovieVideo = async () => {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos`, API_OPTIONS);
        const json = await data.json();
        // console.log(json);

        const filterData = json.results.filter(video => video.type == 'Trailer');
        // console.log(filterData);
        const trailer = filterData.length ? filterData[0] : json.results[0];
        // console.log(trailer);
        dispatch(addTrailerVideo(trailer));
    }

    useEffect(() => {
        getMovieVideo();
    }, []);

}

export default useMovieTrailer