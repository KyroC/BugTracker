import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import projectService from '../services/projectService.js'

let projects = (id) => {
    return projectService.getProject(id)
}

const AddTicket = () => {

    return (
        <div className="add-ticket-page">
            Add Ticket Page
            <div className="add-ticket-page-table">
                <form>
                    <label> Name:
                    <input type="text" value="" name="Name"></input><br />
                    </label>
                    <label> Detail
                        <input type="text" value="" name="Detail"></input><br />
                    </label>
                    <label>Priority:
                        <select> 
                            <option value="High"> High </option>
                            <option value="Medium"> Medium </option>
                            <option value="low"> Low </option>
                        </select> <br />
                    </label>
                    <label> Status:
                        <select>
                            <option value="Open">Open</option>
                            <option value="Worked on">Worked on</option>
                            <option value="Solved">Solved</option>
                        </select>
                    </label>
                </form>
            </div>
        </div>
    )
}
export default AddTicket;