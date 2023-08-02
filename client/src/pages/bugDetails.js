import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BugDetails.module.css';
import bugService from '../services/bugService';

let ticket = (id) => {
    return bugService.getTicket(id)
}
let comment = (id, comment) => {
    return bugService.addComment(id, comment)
}

const BugDetail = () => {
    const { id } = useParams()
    const [ticketArray, setTicketArray] = useState([])
    const [userComment, setUserComment] = useState("")

    const handleComment = (event) => {
        event.preventDefault()
        setUserComment(event.target.value)
        console.log(event.target.value)
    }
    const handleFormSubmit = (event) => {
        event.preventDefault()
        comment(id, ({
            "Comment": userComment
        }))
        .then(res => {
            console.log(res.data)
        })
    }
    useEffect(() => {
        ticket(id)
        .then(res => {
            setTicketArray(res)
            console.log(res)
        })
    },[id])
    return (
        <div className={styles.ticketDetailsPage}>
            <div className={styles.ticketDetailsGrid}>
                <div className={styles.ticketDetailsTitle}>
                    <h3>Details</h3>
                </div>
                <div className={styles.ticketDetailsTable}>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Ticket Name</h4>
                        <div className={styles.ticketName}>{ticketArray.name}</div>
                    </div>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Bug Description</h4>
                        <div className={styles.ticketDetail}>{ticketArray.detail}</div>    
                    </div>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Ticket Priority</h4>
                        <div className={styles.ticketPriority}>{ticketArray.priority}</div>
                    </div>
                    <div className={styles.ticketDetailsItem}>
                        <h4>Ticket Status</h4>
                        <div className={styles.ticketStatus}>{ticketArray.status}</div>
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
            <div className={styles.ticketDetailsGrid}>
                <div className={styles.ticketDetailsTitle}>
                    <h3>Comments</h3>
                </div>
                <div className={styles.commentFormContainer}>
                            <form className={styles.commentForm}>
                                <input placeholder="Comment" className={styles.commentFormInput} value={userComment} onChange={handleComment}></input>
                                <button className={styles.commentFormButton} onClick={handleFormSubmit}>Submit</button>
                            </form>
                            
                        </div>
                <div >
                    <div className={styles.commentTable}>
                    <div className={styles.commentTableDetails}>
                        <div className={`${styles.commentTableDetailsItem} ${styles.commentTableDetailsTitle}`}>
                                        <h4>Comment</h4>    
                                    </div>
                                    <div className={`${styles.commentTableDetailsItem} ${styles.commentTableDetailsTitle}`}>
                                        <h4>Submitter</h4>
                                    </div>
                                
                                </div>
                            {ticketArray.comments?.map((bug) => (
                                <div className={styles.commentTableDetails}>
                                    <div className={styles.commentTableDetailsItem}>{bug.Comment}</div>
                                    <div className={styles.commentTableDetailsItem}>{bug.Submitter}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            <div className={styles.ticketDetailsGrid}>
                <div className={styles.ticketDetailsTitle}>
                    <h3>History</h3>
                </div>
                <div>
                    History Table
                </div>
            </div>
            <div className={styles.ticketDetailsGrid}>
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