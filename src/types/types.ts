export interface IMovie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export interface IWatchedMovie {
  imdbID: string;
  title: string;
  Year: string;
  poster: string;
  runtime: number;
  imdbRating: number;
  userRating: number;
}

export interface IWatchedMovieInList {
  title: string;
  poster: string;
  imdbRating: number;
  userRating: number;
  runtime: number;
}
