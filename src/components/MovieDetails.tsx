import { FC, useEffect, useState } from 'react';
import Loader from './Loader';
import StarRating from './StarRating';
import { IWatchedMovie, IWatchedMovieInList } from '../types/types';

interface MovieDetailsProps {
  selectedId: string;
  onCloseMovie: () => void;
  onAddWatched: (movie: IWatchedMovieInList) => void;
  watched: IWatchedMovie[];
}

const KEY = '2cbdbd96';

const MovieDetails: FC<MovieDetailsProps> = ({ selectedId, onCloseMovie, onAddWatched, watched }) => {
  const [movie, setMovie] = useState<
    | {
        Title: string;
        Year: string;
        Poster: string;
        Runtime: string;
        imdbRating: string;
        Plot: string;
        Released: string;
        Actors: string[];
        Director: string;
        Genre: string;
      }
    | Record<string, never>
  >({});
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);

  const isWatched = watched.map((item: IWatchedMovie) => item.imdbID).includes(selectedId);
  const watchedRating = watched.find((movie: IWatchedMovie) => movie.imdbID === selectedId)?.userRating;

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
      runtime: Number(runtime.split(' ')[0]),
      userRating,
    };

    onAddWatched(newWatchedMovie);
    onCloseMovie();
  };

  useEffect(() => {
    function callback(e: KeyboardEvent) {
      if (e.code === 'Escape') {
        onCloseMovie();
      }
    }

    document.addEventListener('keydown', callback);

    return () => document.removeEventListener('keydown', callback);
  }, [onCloseMovie]);

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

export default MovieDetails;
