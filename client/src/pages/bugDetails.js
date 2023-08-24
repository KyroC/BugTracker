import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import styles from './BugDetails.module.css';
import bugService from '../services/bugService';
import userService from '../services/userService';
import projectService from '../services/projectService'

let ticket = (id) => {
    return bugService.getTicket(id)
}
let comment = (id, comment) => {
    return bugService.addComment(id, comment)
}
let project= (id) => {
    return projectService.getProject(id)
}

const BugDetail = () => {
    const { id } = useParams()
    const [ticketArray, setTicketArray] = useState([])
    const [userComment, setUserComment] = useState("")
    const [ticketName , setTicketName]  = useState("")
    const [ticketDetail, setTicketDetail] = useState("")
    const [ticketPriority, setTicketPriority] = useState("")
    const [ticketStatus, setTicketStatus] = useState("")
    const [ticketUsers, setTicketUsers] = useState([])
    const [ticketProject, setTicketProject] = useState("'")
    const [projectUsers, setProjectUsers] = useState([])
    const didMountRef = useRef(false)

    const priorities=["Low","Medium","High"]
    const statuses=["Open","Assigned","Solved"]

    const handleComment = (event) => {
        event.preventDefault()
        setUserComment(event.target.value)
        console.log(event.target.value)
    }
    const handleCommentSubmit = (event) => {
        event.preventDefault()
        comment(id, ({
            "Comment": userComment
        }))
        .then(res => {
            console.log(res.data)
        })
        window.location.reload()
    }
    const handleTicketName = (event) => {
        event.preventDefault()
        setTicketName(event.target.value)
    }
    const handleTicketDetail = (event) => {
        event.preventDefault()
        setTicketDetail(event.target.value)
    }
    const handleTicketPriority = (event) => {
        event.preventDefault()
        setTicketPriority(event.target.value)
    }
    const handleTicketStatus = (event) => {
        event.preventDefault()
        setTicketStatus(event.target.value)
    }
    const handleTicketUsers = (event) => {
        event.preventDefault()
        setTicketUsers(event.target.value)
    }
    const handleFromSubmit = (event) => {
        bugService.updateTicket(id, {
            name:ticketName,
            detail:ticketDetail,
            priority:ticketPriority,
            status:ticketStatus,
            users:ticketUsers
        })
    }

    useEffect(() => {
        ticket(id)
        .then(res => {
            setTicketArray(res)
            setTicketName(res.name)
            setTicketDetail(res.detail)
            setTicketPriority(res.priority)
            setTicketStatus(res.status)
            setTicketUsers(res.users)
            setTicketProject(res.project)
            console.log(res)
        })
    },[id])
    useEffect(() => {
        if(didMountRef.current) {
            project("64cb5f5a26f9b4b4697fa19b")
            .then(res => {
                setProjectUsers(res.users)
                console.log(res.users)})
        }
        didMountRef.current = true; 
    }, [ticketProject])

    return (
        <div className={styles.ticketDetailsContainer}>
            <div className={styles.ticketDetailsPage}>
                <div className={styles.ticketDetailsGridContainer}>
                    <div className={styles.ticketDetailsGrid}>
                        <div className={styles.ticketDetailsTitle}>
                            <h3>Details</h3>
                        </div>
                        <form>
                        <div className={styles.ticketDetailsTable}>
                            <div className={styles.ticketDetailsItem}>
                                <h4>Ticket Name</h4>
                                    <div className={styles.ticketName}>
                                        <input type="text" value={ticketName}
                                        className={styles.ticketInput} onChange={handleTicketName}/>
                                    </div>
                            </div>
                            <div className={styles.ticketDetailsItem}>
                                <h4>Bug Description</h4>
                                <div className={styles.ticketDetail}>
                                    <input type="text" value={ticketDetail}
                                        className={styles.ticketInput} onChange={handleTicketDetail}/>
                                </div>    
                            </div>
                            <div className={styles.ticketDetailsItem}>
                                <h4>Ticket Priority</h4>
                                <div className={styles.ticketPriority}>
                                    <select className={styles.ticketInput} onChange={handleTicketPriority}>
                                        {priorities.map((priority) => {
                                            if(ticketPriority === priority) {
                                                return(
                                                    <option value={priority} selected>{priority}</option>
                                                )
                                            }
                                            return(
                                                <option value={priority}>{priority}</option>
                                            )
                                        }
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.ticketDetailsItem}>
                                <h4>Ticket Status</h4>
                                <div className={styles.ticketStatus}>
                                    <select className={styles.ticketInput} onChange={handleTicketStatus}>
                                        {statuses.map((status) => {
                                            if(ticketStatus===status) {
                                                return(
                                                    <option value={status} selected>{status}</option>
                                                )
                                            } 
                                            return(
                                                <option value={status}>{status}</option>
                                            )
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className={styles.ticketDetailsItem}>
                                <h4>Submitter</h4>
                                <div className={styles.ticketInput}>{ticketArray?.creator?.name}</div>
                            </div>
                            <div className={styles.ticketDetailsItem}>
                                <h4>Assigned personnel</h4>
                                <div>
                                    <select className={styles.ticketInput} onChange={handleTicketUsers}>
                                        {projectUsers.map(user=> (
                                            <option value={user.id}>
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className={styles.ticketDetailsItemUpdate}>
                            <button type="submit" onClick={handleFromSubmit}>Update</button>
                        </div>
                        </form>
                    </div>
                </div>
                <div className={styles.ticketDetailsGridContainer}>
                    <div className={styles.ticketDetailsGrid}>
                        <div className={styles.ticketDetailsTitle}>
                            <h3>Comments</h3>
                        </div>
                        <div className={styles.commentFormContainer}>
                                    <form className={styles.commentForm}>
                                        <input placeholder="Comment" className={styles.commentFormInput} value={userComment} onChange={handleComment}></input>
                                        <button className={styles.commentFormButton} onClick={handleCommentSubmit}>Submit</button>
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
                </div>
                <div className={styles.ticketDetailsGridContainer}>
                    <div className={styles.ticketDetailsGrid}>
                        <div className={styles.ticketDetailsTitle}>
                            <h3>History</h3>
                        </div>
                        <div>
                            History Table
                        </div>
                    </div>
                </div>
                <div className={styles.ticketDetailsGridContainer}>
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
            </div>
        </div>
    )
}

export default BugDetail;