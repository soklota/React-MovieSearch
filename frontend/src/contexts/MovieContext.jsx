//provide gloabl state and helper functions for movie data and search functionality. It uses React's Context API to create a MovieContext that can be accessed by any component within the application, allowing for centralized state management and easier data sharing across components.
import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export const useMovieContext = () => useContext(MovieContext);

export const MovieProvider = ({children}) => {

    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const storedFavorites = localStorage.getItem("favorites");
        if (storedFavorites) {
            setFavorites(JSON.parse(storedFavorites));
        }
    },[]);

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (movie) => {
            setFavorites(prev => [...prev, movie])
        }

    const removeFromFavorites = (movieId) => {
        setFavorites(prev => prev.filter(movie => movie.id !== movieId))
    }

    const isFavorite = (movieId) => {
        return favorites.some(movie => movie.id === movieId);
    } //checks if a movie is in the favorites list by checking if any movie in the favorites array has the same id as the provided movieId. It returns true if the movie is found, otherwise false.

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    }

    return <MovieContext.Provider value={value}>
        {children}
    </MovieContext.Provider>
}
//provide state to any compnent that needs it. It wraps the children components with the MovieContext.Provider, passing down the state and functions as the value prop. This allows any component within the provider to access and manipulate the movie data and search functionality without prop drilling.
