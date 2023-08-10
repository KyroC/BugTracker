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
    const [sortedArray, setSortedArray] = useState([])
    const sortByHighPriority = 
        //to double check
        sortedArray.sort((a,b) => {
            if (a.priority === "High" && b.priority!=="High") {
                return -1
            }
            if (a.priority === "Medium" && b.priority!=="Medium") {
                return -1
            }
            return 0
        }

        ) 
    const handlePriorityClick = () => {
        setSortedArray(sortByHighPriority)
        console.log(sortByHighPriority)
        console.log(sortedArray)
    }
    useEffect(() => {
        bugsList()
        .then(res => {
            setBugsArray(res)
            console.log(bugsArray)
            setFilteredArray(res)
            setSortedArray(res)
        })
    },[])
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
                {sortedArray.map(bug => (
                    <div className={styles.bugsTableRow}>
                        <div className={styles.bugData}>{bug.name}</div>
                        <div className={styles.bugData}>{bug.detail}</div>
                        <div className={styles.bugData}>{bug.status}</div>
                        <div className={styles.bugData}>{bug.type}</div>
                        <div className={styles.bugData}>{bug.priority}</div>
                    </div>
                 ))}
                 <button onClick={ handlePriorityClick}>Sort</button>
            </div>
        </div>
    )
}

export default Bugs;