import {Link} from 'react-router-dom' //importing the Link component from react-router-dom. The Link component is used for navigation between different routes in a React application without causing a full page reload.
import "../css/Navbar.css"

function NavBar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Movie App</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/favorites" className="nav-link">Favorites</Link>
            </div>
        </nav>
    );
}

export default NavBar;