import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from "../services/userService";
import styles from "./bugs.module.css"

const bugsList = () => {
    return userService.getUserBugs()
}
const Bugs = () => {
    const [bugsArray, setBugsArray] = useState([])
    const [filteredArray, setFilteredArray] = useState([])

    useEffect(() => {
        bugsList()
        .then(res => {
            setBugsArray(res)
            setFilteredArray(res)
        })
    })
    return(
        <div className={styles.bugs}>
            <div className={styles.bugsTable}>
                <div className={styles.bugsTableRow}>
                    <div className={styles.bugData}><b>Name</b></div>
                    <div className={styles.bugData}><b>Detail</b></div>
                    <div className={styles.bugData}><b>Status</b></div>
                    <div className={styles.bugData}><b>Type</b></div>
                    <div className={styles.bugData}><b>Priority</b></div>
                </div>
                {bugsArray.map(bug => (
                    <div className={styles.bugsTableRow}>
                        <div className={styles.bugData}>{bug.name}</div>
                        <div className={styles.bugData}>{bug.detail}</div>
                        <div className={styles.bugData}>{bug.status}</div>
                        <div className={styles.bugData}>{bug.type}</div>
                        <div className={styles.bugData}>{bug.priority}</div>
                    </div>
                 ))}
            </div>
        </div>
    )
}

export default Bugs;