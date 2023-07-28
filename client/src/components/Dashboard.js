import {useState, useEffect} from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import styles from './Dashboard.module.css';

const Dashboard = () => {
    return(
        <div className={styles.dashboard}>
            <div>Assigned Projects</div>
            <div>Assigned ticket status by priority</div>

        </div>
    )
}

export default Dashboard;