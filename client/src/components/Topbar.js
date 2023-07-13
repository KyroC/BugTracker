import { Link } from 'react-router-dom'
import './Topbar.css';
const onLogoutClick = () => {
    localStorage.clear()
}

const Topbar = () => {
   
    return(
        <div className="topbar">
            <div className="topbar-left">Logged in as: test</div>
            <div className="topbar-right">
                <ul>
                    <li>Search</li>
                    <li>Notifications</li>
                    <li>User settings</li>
                    <li>
                        <Link to="/">
                            <button onClick={onLogoutClick}>Log Out</button>
                        </Link >
                    </li>
                </ul>
            </div>
    </div>
    )
}
export default Topbar;