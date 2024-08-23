import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import axios from 'axios';

function MoviesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get('query') ?? '';

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchQuery = e.target.elements.search.value;
    setSearchParams({ query: searchQuery });

    try {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: { query: searchQuery },
        headers: {
          Authorization: `Bearer YOUR_API_TOKEN`,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Failed to search movies', error);
    }
  };

  return (
    <div>
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input name="search" type="text" defaultValue={query} />
        <button type="submit">Search</button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
}

export default MoviesPage;
