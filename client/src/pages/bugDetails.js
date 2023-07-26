import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BugDetails.module.css';
import bugService from '../services/bugService';

let ticket = (id) => {
    return bugService.getTicket(id)
}

const BugDetail = () => {
    const { id } = useParams()
    const [ticketArray, setTicketArray] = useState([])
    useEffect(() => {
        ticket(id)
        .then(res => {
            setTicketArray(res)
            console.log(res)
        })
    },[])
    return (
        <div className={styles.ticketDetailsPage}>
            <div className={styles.ticketDetailsGrid}>
                <div className={styles.ticketDetailsTitle}>
                    <h3>Details</h3>
                </div>
                <div className={styles.ticketDetailsTable}>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Ticket Name</h4>
                        <div>{ticketArray.name}</div>
                        </div>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Bug Description</h4>
                        <div>{ticketArray.detail}</div>    
                    </div>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Ticket Priority</h4>
                        <div>{ticketArray.priority}</div>
                    </div>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Ticket Status</h4>
                        <div>{ticketArray.status}</div>
                    </div>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Submitter</h4>
                        <div>{ticketArray.creator}</div>
                    </div>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Assigned personnel</h4>
                        <div>{ticketArray.users}</div>
                    </div>
                </div>
            </div>
            <div>
                <div className={styles.ticketDetailsTitle}>
                    <h3>Comments</h3>
                </div>
                <div>
                    <div>Comments table</div>
                    <button>Add Comment</button>
                </div>
            </div>
            <div>
                <div className={styles.ticketDetailsTitle}>
                    <h3>History</h3>
                </div>
                <div>
                    History Table
                </div>
            </div>
            <div>
                <div className={styles.ticketDetailsTitle}>
                    <h3>Pictures</h3>
                </div>
                <div>
                    Picture table
                    <button>Add Picture</button>
                </div>
            </div>
        </div>
    )
}

export default BugDetail;