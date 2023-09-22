import { useState } from 'react';

import MovieDetails from './components/MovieDetails';
import NavBar from './components/NavBar';
import Search from './components/Search';
import NumResults from './components/NumResults';
import Main from './components/Main';
import Box from './components/Box';
import Loader from './components/Loader';
import MovieList from './components/MovieList';
import ErrorMessage from './components/ErrorMessage';
import WatchedSummary from './components/WatchedSummary';
import WatchedMoviesList from './components/WatchedMoviesList';

import { useMovies } from './hooks/useMovies';
import { useLocalStorageState } from './hooks/useLocalStorageState';
import { IWatchedMovieInList } from './types/types';

export default function App() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const { movies, isMoviesLoading, error } = useMovies(query, handleCloseMovie);
  const [watched, setWatched] = useLocalStorageState([], 'watched');

  const handleSelectMovie = (id: string) => {
    setSelectedId((prev) => (prev === id ? '' : id));
  };

  function handleCloseMovie() {
    setSelectedId('');
  }

  const handleAddWatched = (movie: IWatchedMovieInList) => {
    setWatched((prev: IWatchedMovieInList[]) => [...prev, movie]);
  };

  const handleDeleteWatched = (id: string) => {
    setWatched((watched: IWatchedMovieInList[]) => watched.filter((movie: IWatchedMovieInList) => movie.imdbID !== id));
  };

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {isMoviesLoading && <Loader />}
          {!isMoviesLoading && !error && <MovieList movies={movies} onSelectMovie={handleSelectMovie} />}
          {error && <ErrorMessage message={error} />}
        </Box>

        <Box>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={handleCloseMovie}
              onAddWatched={handleAddWatched}
              watched={watched}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} onDeleteWatched={handleDeleteWatched} />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}
