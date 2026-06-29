import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import { searchMovies, getPopularMovies } from "../services/api";
import "../css/Home.css";

function Home() {
    const [searchQuery, setSearchQuery] = useState(""); //useState is a React hook that allows you to add state to functional components. In this case, it initializes the searchQuery state variable with an empty string and provides a function setSearchQuery to update its value.
    const [movies, setMovies] = useState([]); // Initializes the movies state variable as an empty array and provides a function setMovies to update its value. This will hold the list of movies fetched from the API.
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadPopularMovies = async () => {
        try {
          const popularMovies = await getPopularMovies();
          setMovies(popularMovies);
        } catch(err) {
          console.log(err);
          setError("Failed to load movies...");
        }
        finally{
          setLoading(false);
        }
      };
      loadPopularMovies()
    },[]);

    const handleSearch = async (e) => {
        e.preventDefault(); //prevents the default form submission behavior, which would cause a page reload. This allows for handling the search logic without refreshing the page.
        if(!searchQuery.trim()) return; //checks if the searchQuery is empty or contains only whitespace. If it does, the function returns early, preventing an unnecessary API call.
        if(loading) return; //checks if the loading state is true. If it is, the function returns early, preventing multiple simultaneous API calls while a previous search is still in progress.

        setLoading(true)
        try {
          const searchResults = await searchMovies(searchQuery);
          setMovies(searchResults)
          setError(null); //clears any previous error messages by setting the error state to null. This ensures that if a previous search resulted in an error, it won't be displayed when a new search is successful.
        } catch (err) {
          console.log(err);
          setError("Failed to search movies...");
        }
        finally {
          setLoading(false); //whether fails or succeeds, it sets loading to false after the search operation is complete.
        }
    };

    return (<div className="home"> 
        <form onSubmit={handleSearch} className="search-form">
          <input 
          type="text" 
          placeholder="Search movies..." 
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          />
            <button type="submit" className="search-button">Search</button>
        </form>
        {error && <div className="error-message">{error}</div>}
      {loading ? <div className="loading">Loading...</div> : error ? <div className="error">{error}</div> : movies.length === 0 ? <div className="no-results">No movies found.</div> : null}
      <div className="movies-grid">
        {movies.map((movie) => (<MovieCard movie={movie} key={movie.id}/>))} 
      </div>
    </div>);
};

export default Home;