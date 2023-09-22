import { FC } from 'react';

import { IWatchedMovie } from '../types/types';

interface WatchedMovieProps {
  movie: IWatchedMovie;
  onDeleteWatched: (id: string) => void;
}

const WatchedMovie: FC<WatchedMovieProps> = ({ movie, onDeleteWatched }) => {
  return (
    <li>
      <img src={movie.poster} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button className='btn-delete' onClick={() => onDeleteWatched(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  );
};

export default WatchedMovie;
