import { useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import projectService from '../services/projectService.js'
import bugService from '../services/bugService'
import styles from './addTicket.module.css'

const AddTicket = () => {
    const [ticketName, setTicketName] = useState("")
    const [ticketDetails, setTicketDetails] = useState("")
    const [ticketPriority, setTicketPriority] = useState("High")
    const [ticketStatus, setTicketStatus] = useState("Open")
    const { id }= useParams()

    const handleTicketName = (event) => {
        event.preventDefault()
        setTicketName(event.target.value)
    }
    const handleTicketDetails = (event) => {
        event.preventDefault()
        setTicketDetails(event.target.value)
    }
    const handleTicketPriority = (event) => {
        event.preventDefault()
        setTicketPriority(event.target.value)
    }
    const handleTicketStatus = (event) => {
        event.preventDefault()
        setTicketStatus(event.target.value)
    }
    const handleTicketSubmit = () => {
        let ticketObj = {
            name: ticketName,
            detail: ticketDetails,
            priority: ticketPriority,
            status: ticketStatus,
            type: "UI",
            project: id
        }
        bugService.addBug(ticketObj)
            .then(res => projectService.addTicket(id,res._id))
        
    }

    return (
        <div className={styles.addTicketContainer}>
            <div className={styles.addTicketPage}>
                <h4>Add Ticket Page</h4>
                <div className="add-ticket-page-table">
                    <form>
                        <label> Name:
                            <input type="text" value={ticketName} name="Name" onChange={handleTicketName} /><br />
                        </label>
                        <label> Detail
                            <input type="text" value={ticketDetails} name="Detail" onChange={handleTicketDetails} /><br />
                        </label>
                        <label>Priority:
                            <select onChange={handleTicketPriority}> 
                                <option value="High" selected> High </option>
                                <option value="Medium"> Medium </option>
                                <option value="Low"> Low </option>
                            </select> <br />
                        </label>
                        <label> Status:
                            <select onChange={handleTicketStatus}>
                                <option value="Open" selected>Open</option>
                                <option value="Assigned">Assigned</option>
                                <option value="Solved">Solved</option>
                            </select> < br />
                        </label>
                        <Link to={"/projects/" + id + "/edit"}>
                            <button onClick={handleTicketSubmit}>Create Ticket</button>
                        </Link>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default AddTicket;