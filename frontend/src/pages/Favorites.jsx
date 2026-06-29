import "../css/Favorites.css"
import { useMovieContext } from "../contexts/MovieContext";
import MovieCard from "../components/MovieCard";

function Favorites() {
    const { favorites } = useMovieContext();

    if (favorites) {
        
        return(
            <div className="favorites">
                <h2>Your Favs</h2>
             <div className="movies-grid">
           {favorites.map(movie => <MovieCard key={movie.id} movie={movie} />)}
        </div>
        </div>
        );
    }

function Favorites(){
    return <div className="favorites-empty">
        <h2>No Favorites yet</h2>
        <p>Add some movies to your favorites!</p>
    </div>;
}
}

export default Favorites