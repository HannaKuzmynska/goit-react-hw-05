import { Link } from 'react-router-dom';
import { getImageUrl } from "../../Api";

import styles from './MovieList.module.css';

function MovieList({ movies }) {
  return (
    <ul className={styles.movieList}>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>
            <img
              src={getImageUrl(movie.poster_path)}
              alt={movie.title}
              className={styles.moviePoster}
            />
            <p>{movie.title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default MovieList;