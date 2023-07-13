import './Topbar.css';

const Topbar = () => {
    return(
        <div className="topbar">
            <div className="topbar-left">Logged in as: test</div>
            <div className="topbar-right">
                <ul>
                    <li>Search</li>
                    <li>Notifications</li>
                    <li>User settings</li>
                    <li><button>Log Out</button></li>
                </ul>
            </div>
    </div>
    )
}
export default Topbar;