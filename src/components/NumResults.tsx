import { FC } from 'react';

import { IMovie } from '../types/types';

interface NumResultsProps {
  movies: IMovie[];
}

const NumResults: FC<NumResultsProps> = ({ movies }) => {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

export default NumResults;
