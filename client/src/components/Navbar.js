import './Navbar.css'
import logo from '../images/buggy-logo.png'

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
                    <li>Dashboard Home</li>
                    <li>Manage Role Assignments</li>
                    <li>Manage Project Users</li>
                    <li>My Projects</li>
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