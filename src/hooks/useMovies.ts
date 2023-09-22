import { useEffect, useState } from 'react';

const KEY = '2cbdbd96';

export function useMovies(query: string, callback: () => void) {
  const [movies, setMovies] = useState([]);
  const [isMoviesLoading, setIsMovieLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    callback?.();

    const controller = new AbortController();

    async function fetchMovies() {
      try {
        setIsMovieLoading(true);
        setError('');
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, { signal: controller.signal });

        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies 😥');
        }

        const data = await res.json();
        if (data.Response === 'False') {
          throw new Error('Movie not found');
        }

        setMovies(data.Search);
        setError('');
      } catch (error: any) {
        console.error(error.message);

        if (error.name !== 'AbortError') {
          setError(error.message);
        }
      } finally {
        setIsMovieLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    // handleCloseMovie();
    fetchMovies();

    return function () {
      controller.abort();
    };
  }, [query]);

  return { movies, isMoviesLoading, error };
}
