import { FC } from 'react';

import { IMovie } from '../types/types';

import Movie from './Movie';

interface MovieListProps {
  movies: IMovie[];
  onSelectMovie: (id: string) => void;
}

const MovieList: FC<MovieListProps> = ({ movies, onSelectMovie }) => {
  return (
    <ul className='list list-movies'>
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} onSelectMovie={onSelectMovie} />
      ))}
    </ul>
  );
};

export default MovieList;
