import "./projectDetails.css"
import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import projectService from '../services/projectService.js'

//Note - 2 ways of getting data, passing state and useLocation or axios.get
//Axios get chosen due to refreshing of data when edition project details
//sample data - update to axios.get based on ID


let projects = (id) =>{
    return projectService.getProject(id)
} 

const ProjectDetails = () => {
    const { id } = useParams() 
    const [projectArray, setProjectArray] = useState([])

    useEffect(() => {
        projects(id)
        .then(res => {
            setProjectArray(res)
            
        })
    },[id])
    
    return(
        <div className="project-grid">
            <div className="project-grid-details box1 project-grid-item">
                <div className="project-grid-title box-a1">
                    <div><h1>{projectArray.name}</h1></div> 
                    </div>
                <div className="project-grid-name box-a2">
                    <div><b>Project Name:</b></div><br />
                    <div>{projectArray.name}</div>
                </div>
                <div className="project-grid-description a3">
                    <div><b>Project Description:</b></div>
                    <div>{projectArray.details}</div>
                </div>
            </div>
            <div className="project-bugs box2 project-grid-item">
                <div className="project-bugs-title center">
                    <b>Tickets/Bugs for this project</b>
                </div>
                <div className="project-bugs-table">
                    <div className="project-bugs-items table-header">
                        <div className="project-bugs-info"><b>Bug Name</b></div>
                        <div className="project-bugs-info"><b>Bug Details</b></div>
                        <div className="project-bugs-info"><b>Bug Priority</b></div>
                        <div className="project-bugs-info"><b>Last updated</b></div>
                    </div>
                    {projectArray.bugs?.map((bug)=> (
                        <div className="project-bugs-items">
                         <div className="project-bugs-info">{bug.name}</div>
                         <div className="project-bugs-info">{bug.detail}</div>
                         <div className="project-bugs-info">{bug.priority}</div>
                         <div className="project-bugs-info">{bug.detail}</div>
                        </div>
                    ))}
                </div>
            </div>
        <div className="project-users box3 project-grid-item">
                <div className="project-users-title center">
                    <div><b>Assigned Personnel</b></div>
                </div>
                <div className="project-users-table-container">
                    <div className="project-users-table table-header">
                        <div className="project-user-table-items"><h4>User</h4></div>
                        <div className="project-user-table-items"><h4>Role</h4></div>
                    </div>
                {projectArray.users?.map((user)=> (
                    <div className="project-users-table">
                        <div className="project-user-table-items">{user.name}</div>
                        <div className="project-user-table-items">{user.role}</div>
                    </div> 
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ProjectDetails;