import './Navbar.css'
import logo from '../images/buggy-logo.png'
import { Link } from "react-router-dom"

const Navbar = () => {
    return(
        <div className="navbar">
            <div className="navbar-top">
                <ul>
                    <li>
                        <a href="Logo-container">
                            <img src={logo} alt="Logo"/>
                        </a>
                    </li>
                    <li>
                        <Link to ="/">Dashboard Home</Link>
                    </li>
                    <li>
                        <Link to="/Projects">My Projects</Link>
                    </li>
                    <li>
                        <Link to ="">Manage Role Assignments</Link>
                    </li>
                    <li>Manage Project Users</li>
                    
                    <li>My Tickets</li>
                    <li>User Profile</li>
                </ul>
            </div>
            <div className="navbar-bottom">Nav-bottom/Footer
            
            </div>
        </div>
    )
}

export default Navbar;