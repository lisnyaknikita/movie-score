import { useEffect, useState } from 'react';
import { IWatchedMovieInList } from '../types/types';

export function useLocalStorageState(initialState: IWatchedMovieInList | [], key: string) {
  const [value, setValue] = useState<IWatchedMovieInList | []>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue];
}
