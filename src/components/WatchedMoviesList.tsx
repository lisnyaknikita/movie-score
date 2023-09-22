import { FC } from 'react';

import WatchedMovie from './WatchedMovie';

import { IWatchedMovie } from '../types/types';

interface WatchedListProps {
  watched: IWatchedMovie[];
  onDeleteWatched: (id: string) => void;
}

const WatchedMoviesList: FC<WatchedListProps> = ({ watched, onDeleteWatched }) => {
  return (
    <ul className='list'>
      {watched.map((movie) => (
        <WatchedMovie key={movie.imdbID} movie={movie} onDeleteWatched={onDeleteWatched} />
      ))}
    </ul>
  );
};

export default WatchedMoviesList;
