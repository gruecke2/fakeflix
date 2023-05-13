import './App.css';
import React, {useState, useEffect} from 'react';
import MovieCard from './MovieCard'
import './App.css';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com?apikey=24b6f27c'

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const searchMovies = async (title) => {
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();

    setMovies(data.Search);
  }
  useEffect(() => {
    searchMovies('The Mask')
  }, [])


  // 24b6f27c

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      // 👇 Get input value
      searchMovies(searchTerm);
    }
  };

  return (
    <div className="app">
      <h1>Fakeflix</h1>
      <div className="search">
        <input 
          placeholder='Search for movies'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <img 
          src={SearchIcon} 
          alt="search"
          onClick={(e) => searchMovies(searchTerm)}
          />
      </div>
      <div className="container">
        {
          movies?.length > 0 ?
          (
            movies.map((movie, i) => (
              <MovieCard key={i} movie={movie} />
            ))
          ) : (
            <div className="empty">
              <h2>No movies found</h2>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default App;
