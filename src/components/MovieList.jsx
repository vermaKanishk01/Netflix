import { useRef } from 'react'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {

    // console.log(movies);
    // console.log(movies[5].poster_path)
    return (
        <div className=''>
            <h1 className='text-3xl py-4 text-white'>{title}</h1>
            <div className='flex overflow-x-scroll no-scrollbar'>
                <div className='flex gap-2' >
                    {
                        movies?.map(movie => <MovieCard key={movie.id} posterPath={movie.poster_path} />)
                    }
                </div>
            </div>
        </div>
    )
}

export default MovieList