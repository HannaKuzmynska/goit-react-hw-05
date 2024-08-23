import { useState } from 'react';
import styles from './SearchForm.module.css';

function SearchForm({ onSubmit }) {
  const [value, setValue] = useState('');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(value.trim());
  };

  return (
    <form onSubmit={handleSubmit} className={styles.searchForm}>
      <input
        type="text"
        name="search"
        value={value}
        onChange={handleChange}
        placeholder="Search for movies..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchForm;