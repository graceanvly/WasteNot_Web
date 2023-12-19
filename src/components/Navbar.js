import { Link } from "react-router-dom";
import image from "../images/logo.png";
import "../Pages/Design/navbar.css";

export default function Navbar() {
    return <nav className="navbar">
        <a href="/" className="site-title"><img src={image} alt="NavBar logo"/>WasteNot</a>
        <ul>
            <li>
            <Link to="/aboutus"><button type="button" className="aboutus">About Us</button></Link>
            </li>
        </ul> 
    </nav>
}