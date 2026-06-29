
import './css/App.css'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import NavBar from './components/NavBar'
import {Routes, Route} from 'react-router-dom' //importing the Routes and Route components from react-router-dom. These components are used for defining the routing structure of the application, allowing navigation between different pages or views based on the URL path.
import { MovieProvider } from './contexts/MovieContext' //importing the MovieProvider component from the MovieContext file. This component is responsible for providing the global state and helper functions related to movie data and search functionality to the entire application. It wraps the main content of the app, allowing any child component to access the movie context without prop drilling.

function App() { // Components always start with a capital letter. This is the main component of the application. It serves as the entry point for rendering other components and managing the overall layout and structure of the app.
  return (
    <MovieProvider>
      <NavBar />
    <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </main>
    </MovieProvider>
  );
}

export default App;
