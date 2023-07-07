import {useState, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import projectService from '../services/projectService.js'
import RoleForm from '../components/roleForm'
import './projectEdit.css'

let projects = (id) => {
    return projectService.getProject(id) 
}
let users = () => {
    return projectService.getUser()
}

const ProjectEdit = () => {
    const [projectArray, setProjectArray] = useState([])
    const [userArray, setUserArray] = useState([])
    const { id } = useParams()
    const handleDelete = (event) => {
        projectService.deleteProjectUser(id, event.target.value)
    }
    const handleProjectDelete = () => {
        projectService.deleteProject(id)
    }
    useEffect(() => {
        users()
        .then(res => {console.log(res)
            setUserArray(res)}
            )
    },[])
    useEffect(() => {
        projects(id)
        .then(res => {
            console.log(res)
            setProjectArray(res)
        })
    },[id])
    
    return(
        <div>
            <div className="project-edit-title"><h2>Edit Project</h2></div>
            <div>
                <div>Assign Users</div>
                <RoleForm userArray={userArray} projectId={id}/>
                <div>Current Assigned</div>
                <div className="assigned-user-details-wrapper">
                    {projectArray.users?.map((user)=> ( 
                        <div className="assigned-user-details">
                            <div className="assigned-user-details-data">{user.name}</div>
                            <div className="assigned-user-details-data">{user.email}</div>
                            <div className="assigned-user-details-data"> {user.role}</div>
                            <div 
                            className="assigned-user-details-delete">
                                <button value={user.id} onClick={handleDelete}>Delete</button>
                            </div>
                        </div>
                    ))}
                 </div>
                 <div className="Current Tickets">
                    <div>Current Tickets</div>
                    <div className="ticket-table-wrapper">
                        {projectArray.bugs?.map((bug) => (
                            <div className="ticket-table">
                                <div className="ticket-name">{bug.name}</div>
                                <div className="ticket-detail">{bug.detail}</div>
                                <div className="ticket-status">{bug.status}</div>
                                <div className="ticket-priority">{bug.priority}</div>
                            </div>
                        ))}
                    </div>
                 </div>
            </div>
            <div>
                    <Link to="/projects">
                        <button onClick={handleProjectDelete}>Delete Project</button>
                    </Link>
                </div>
        </div>
    )
}

export default ProjectEdit;