import React, { useState, useEffect, Suspense } from 'react';
import { useParams, Link, Routes, Route, useLocation } from 'react-router-dom';
import { fetchMovieDetails } from '../../Api';
import styles from './MovieDetailsPage.module.css';

const MovieCast = React.lazy(() => import('../../components/MovieCast/MovieCast.jsx'));
const MovieReviews = React.lazy(() => import('../../components/MovieReviews/MovieReviews.jsx'));

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();

  useEffect(() => {
    fetchMovieDetails(movieId).then(setMovie);
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className={styles.container}>
      <Link to={location.state?.from ?? '/movies'} className={styles.backButton}>
        Go back
      </Link>
      <div className={styles.details}>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className={styles.image}
        />
        <div className={styles.info}>
          <h2>{movie.title}</h2>
          <p>{movie.overview}</p>
          <p>Release date: {movie.release_date}</p>
          <p>Rating: {movie.vote_average}</p>
        </div>
      </div>
      <div className={styles.additionalInfo}>
        <Link to="cast" state={{ from: location.state?.from }} className={styles.link}>
          Cast
        </Link>
        <Link to="reviews" state={{ from: location.state?.from }} className={styles.link}>
          Reviews
        </Link>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;