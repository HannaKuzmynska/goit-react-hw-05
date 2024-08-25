import { useState, useEffect } from 'react';
import { searchMovies } from '../../Api';
import MovieList from '../../components/MovieList/MovieList';
import SearchForm from '../../components/SearchForm/SearchForm';
import { useSearchParams } from 'react-router-dom';
import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      try {
        const results = await searchMovies(query);
        if (results.length === 0) {
          setError('No movies found. Please try a different search.');
        } else {
          setError(null);
        }
        setMovies(results);
      } catch (err) {
        setError('Something went wrong. Please try again later.');
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = (newQuery) => {
    setSearchParams({ query: newQuery });
  };

  return (
    <div className={styles.container}>
      <h1>Search Movies</h1>
      <SearchForm onSubmit={handleSearch} />
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;
