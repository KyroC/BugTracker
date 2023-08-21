import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import './Topbar.css';
import userService from '../services/userService';

const onLogoutClick = () => {
    localStorage.clear();
    window.location.reload();
}
const userProfile = () => {
    return userService.getUser()
}

const Topbar = () => {
    const [user,setUser] = useState([])
    useEffect(() => {
        userProfile()
        .then(res => {
            setUser(res)
            console.log(res)
        })
    },[])
    return(
        <div className="topbar-container">
            <div className="topbar">
                <div className="topbar-left">Logged in as: {user.name}</div>
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
        </div>
        )
    }
export default Topbar;