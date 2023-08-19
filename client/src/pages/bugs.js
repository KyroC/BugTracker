import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import userService from "../services/userService";
import styles from "./bugs.module.css";
import ReactPaginate from 'react-paginate';


const bugsList = () => {
    return userService.getUserBugs()
}

const Bugs = () => {
    const [bugsArray, setBugsArray] = useState([])
    const [filteredArray, setFilteredArray] = useState([])
    const [sortedArray, setSortedArray] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [ticketsPerPage] = useState(10)

    const indexOfLastTicket = ticketsPerPage * currentPage 
    const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage
    const currentTicket = sortedArray.slice(indexOfFirstTicket,indexOfLastTicket)

    const handleCurrentPage = ({selected}) => {
        setCurrentPage(selected + 1)
    }

    const handlePriorityClick = () => {
            const priorities = ["High","Medium","Low"]
            const priorityArray = sortedArray.sort((a,b) => 
                priorities.indexOf(a.priority) - priorities.indexOf(b.priority)
            )
        setSortedArray([...priorityArray])
    }
    const handleStatusClick = () => {
        const statuses = ["Open","Assigned","Worked on","Solved"]
        const statusArray = sortedArray.sort((a,b) => (
            statuses.indexOf(a.status) - statuses.indexOf(b.status)
        )
        )
       setSortedArray([...statusArray])
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
                <div className={`${styles.bugsTableRow} ${styles.bugTableHeader}`}>
                    <div className={`${styles.bugData} ${styles.bugTitle}`}><b>Name</b></div>
                    <div className={`${styles.bugData} ${styles.bugTitle}`}><b>Detail</b></div>
                    <div className={`${styles.bugData} ${styles.bugTitle}`} onClick={handleStatusClick}><b>Status</b></div>
                    <div className={`${styles.bugData} ${styles.bugTitle}`}><b>Type</b></div>
                    <div className={`${styles.bugData} ${styles.bugTitle}`} onClick={handlePriorityClick}><b>Priority</b></div>
                </div>
                {currentTicket.map(bug => (
                    <div className={styles.bugsTableRow}>
                        <div className={styles.bugData}>{bug.name}</div>
                        <div className={styles.bugData}>{bug.detail}</div>
                        <div className={styles.bugData}>{bug.status}</div>
                        <div className={styles.bugData}>{bug.type}</div>
                        <div className={styles.bugData}>{bug.priority}</div>
                    </div>
                 ))}
                 <ReactPaginate
                    onPageChange={handleCurrentPage}
                    pageCount={Math.ceil(bugsArray.length / ticketsPerPage)}
                    previousLabel={'Prev'}
                    nextLabel={'Next'}
                    containerClassName={styles.pagination}
                    pageLinkClassName={styles.pagination__link}
                    previousLinkClassName={styles.pagination__link}
                    nextLinkClassName={styles.pagination__link}
                    disabledLinkClassName={styles.pagination__link__disabled}
                    activeLinkClassName={styles.pagination__link__active}
                 />
                 <button onClick={ handlePriorityClick}>Sort By Priority</button>
                 <button onClick = {handleStatusClick}>Sort By Status</button>
            </div>
        </div>
    )
}

export default Bugs;