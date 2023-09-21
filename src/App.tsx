import { FC, useEffect, useState } from 'react';
import StarRating from './components/StarRating';

const KEY = '2cbdbd96';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

interface WatchedMovie {
  imdbID: string;
  title: string;
  Year: string;
  poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}

const average = (arr) => arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

interface SearchProps {
  query: string;
  setQuery: (query: string) => void;
}

const Search: FC<SearchProps> = ({ query, setQuery }) => {
  return (
    <input
      className='search'
      type='text'
      placeholder='Search movies...'
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
};

const Logo = () => {
  return (
    <div className='logo'>
      <span role='img'>🍿</span>
      <h1>MoviesScore</h1>
    </div>
  );
};

interface NumResultsProps {
  movies: Movie[];
}

const NumResults: FC<NumResultsProps> = ({ movies }) => {
  return (
    <p className='num-results'>
      Found <strong>{movies.length}</strong> results
    </p>
  );
};

interface NavBarProps {
  children: React.ReactNode;
}

const NavBar: FC<NavBarProps> = ({ children }) => {
  return (
    <nav className='nav-bar'>
      <Logo />
      {children}
    </nav>
  );
};

interface MovieProps {
  movie: Movie;
  onSelectMovie: (id: string) => void;
}

const Movie: FC<MovieProps> = ({ movie, onSelectMovie }) => {
  return (
    <li onClick={() => onSelectMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
};

interface MovieListProps {
  movies: Movie[];
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

interface ListBoxProps {
  children: React.ReactNode;
}

const Box: FC<ListBoxProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='box'>
      <button className='btn-toggle' onClick={() => setIsOpen((open) => !open)}>
        {isOpen ? '–' : '+'}
      </button>
      {isOpen && children}
    </div>
  );
};

interface WatchedSummaryProps {
  watched: WatchedMovie[];
}

const WatchedSummary: FC<WatchedSummaryProps> = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));

  return (
    <div className='summary'>
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
};

interface WatchedMovieProps {
  movie: WatchedMovie;
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

interface WatchedListProps {
  watched: WatchedMovie[];
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

interface MainProps {
  children: React.ReactNode;
}

const Main: FC<MainProps> = ({ children }) => {
  return <main className='main'>{children}</main>;
};

const Loader: FC = () => {
  return <p className='loader'>Loading...</p>;
};

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: FC<ErrorMessageProps> = ({ message }) => {
  return (
    <p className='error'>
      <span>🔴</span> {message}
    </p>
  );
};

interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: any) => void;
  watched: any;
}

const MovieDetails: FC<MovieDetailsProps> = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState<any>({});
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((item: any) => item.imdbID).includes(selectedId);
  const watchedRating = watched.find((movie: any) => movie.imdbID === selectedId)?.userRating;

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Actors: actors,
    Director: director,
    Genre: genre,
  } = movie;

  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(' ').at(0)),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    async function fetchMovieDetails() {
      setIsDetailsLoading(true);
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`);

      const data = await res.json();
      setMovie(data);
      setIsDetailsLoading(false);
    }

    fetchMovieDetails();
  }, [selectedId]);

  useEffect(() => {
    if (!title) return;
    document.title = `Movie | ${title}`;

    return () => {
      document.title = 'Movie score';
    };
  }, [title]);

  return (
    <div className='details'>
      {isDetailsLoading ? (
        <Loader />
      ) : (
        <>
          <header>
            <button className='btn-back' onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`Poster of ${movie}`} />
            <div className='details-overview'>
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span>
                {imdbRating} IMDb Rating
              </p>
            </div>
          </header>

          <section>
            <div className='rating'>
              {!isWatched ? (
                <>
                  <StarRating maxRating={10} size={24} onSetRating={setUserRating} />
                  {userRating > 0 && (
                    <button className='btn-add' onClick={handleAdd}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>You have already rated this movie with {watchedRating}⭐</p>
              )}
            </div>

            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
        </>
      )}
    </div>
  );
};

export default function App() {
  const [query, setQuery] = useState('interstellar');
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState<any>([]);
  const [isMoviesLoading, setIsMovieLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedId, setSelectedId] = useState('');

  const handleSelectMovie = (id: string) => {
    setSelectedId((prev) => (prev === id ? '' : id));
  };

  const handleCloseMovie = () => {
    setSelectedId('');
  };

  const handleAddWatched = (movie: any) => {
    setWatched((prev: any) => [...prev, movie]);
  };

  const handleDeleteWatched = (id: string) => {
    setWatched((watched: any) => watched.filter((movie: any) => movie.imdbID !== id));
  };

  useEffect(() => {
    async function fetchMovies() {
      try {
        setIsMovieLoading(true);
        setError('');
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`);

        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies 😥');
        }

        const data = await res.json();
        if (data.Response === 'False') {
          throw new Error('Movie not found');
        }

        setMovies(data.Search);
      } catch (error: any) {
        console.error(error.message);
        setError(error.message);
      } finally {
        setIsMovieLoading(false);
      }
    }

    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    fetchMovies();
  }, [query]);

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>
      <Main>
        <Box>
          {/* {isMoviesLoading ? <Loader /> : <MovieList movies={movies} />} */}
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
