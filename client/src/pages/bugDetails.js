import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BugDetails.module.css';

const BugDetail = () => {
    return (
        <div className={styles.ticketDetailsPage}>
            <div className={styles.ticketDetailsGrid}>
                <div className={styles.ticketDetailsTitle}>
                    <h3>Details</h3>
                </div>
                <div className={styles.ticketDetailsTable}>
                    <div className={styles.ticketDetailsItem}>Bug Name</div>
                    <div className={styles.ticketDetailsItem}>Bug Description</div>
                    <div className={styles.ticketDetailsItem}>Bug Priority</div>
                    <div className={styles.ticketDetailsItem}>Bug Status</div>
                    <div className={styles.ticketDetailsItem}>Submitter</div>
                    <div className={styles.ticketDetailsItem}>Assigned personnel/currently worked on by</div>
                </div>
            </div>
            <div>
                <h3>Comments</h3>
                <div>
                    <div>Comments table</div>
                    <button>Add Comment</button>
                </div>
            </div>
            <div>
                <h3>History</h3>
                <div>
                    History Table
                </div>
            </div>
            <div>
                <h3>Pictures</h3>
                <div>
                    Picture table
                    <button>Add Picture</button>
                </div>
            </div>
        </div>
    )
}

export default BugDetail;