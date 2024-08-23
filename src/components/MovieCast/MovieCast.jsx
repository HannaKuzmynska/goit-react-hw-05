import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
          headers: {
            Authorization: `Bearer YOUR_API_TOKEN`,
          },
        });
        setCast(response.data.cast);
      } catch (error) {
        console.error('Failed to fetch cast', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map(actor => (
          <li key={actor.cast_id}>
            <p>{actor.name}</p>
            <img
              src={actor.profile_path ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}` : 'https://dummyimage.com/200x300/cdcdcd/000.jpg&text=No+image'}
              alt={actor.name}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MovieCast;
