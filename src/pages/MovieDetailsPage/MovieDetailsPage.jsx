import { useEffect, useState } from 'react';
import { useParams, Link, Outlet, useLocation } from 'react-router-dom';
import axios from 'axios';

function MovieDetailsPage() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLink = location.state?.from ?? '/movies';

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
          headers: {
            Authorization: `Bearer YOUR_API_TOKEN`,
          },
        });
        setMovie(response.data);
      } catch (error) {
        console.error('Failed to fetch movie details', error);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movie) return null;

  return (
    <div>
      <Link to={backLink}>Go back</Link>
      <h1>{movie.title}</h1>
      <img
        src={movie.poster_path ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}` : 'https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster'}
        alt={movie.title}
      />
      <p>{movie.overview}</p>
      <ul>
        <li>
          <Link to="cast" state={{ from: location.state?.from }}>Cast</Link>
        </li>
        <li>
          <Link to="reviews" state={{ from: location.state?.from }}>Reviews</Link>
        </li>
      </ul>
      <Outlet />
    </div>
  );
}

export default MovieDetailsPage;
