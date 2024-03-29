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
        projects(id).then(res => {
            setProjectArray(res)
        })
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
        <div className="project-edit-container">
            <div className="project-edit">
                <div className="project-edit-title"><h3>Edit Project</h3></div>
                <div>
                    <div><b>Assign Users</b></div>
                        <RoleForm userArray={userArray} projectArray={projectArray} setProjectArray={setProjectArray} projectId={id} projects={projects}/> <br />
                    <div><b>Current Assigned</b></div>
                    <div className="assigned-user-details-wrapper">
                        <div className="assigned-user-details">
                            <div className="assigned-user-header"><b>Name</b></div>
                            <div className="assigned-user-header"><b>Email</b></div>
                            <div className="assigned-user-header"><b>Role</b></div>
                            <div className="assigned-user-header"><b>Delete</b></div>
                        </div>
                        {projectArray.users?.map((user)=> ( 
                            <div className="assigned-user-details">
                                <div className="assigned-user-details-data">{user.name}</div>
                                <div className="assigned-user-details-data">{user.email}</div>
                                <div className="assigned-user-details-data">{user.role}</div>
                                <div 
                                className="assigned-user-details-delete">
                                    <button value={user.id} onClick={handleDelete}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div><br />
                    <div className="Current Tickets">
                        <div><b>Current Tickets</b></div>
                        <div>
                            <Link to={"/projects/" + id + "/addTicket"}>
                                <button>Add tickets</button>
                            </Link>
                        </div>
                        <div className="ticket-table-wrapper">
                            <div className="ticket-data">
                                    <div className="ticket-data-header"><b>Ticket</b></div>
                                    <div className="ticket-data-header"><b>Detail</b></div>
                                    <div className="ticket-data-header"><b>Status</b></div>
                                    <div className="ticket-data-header"><b>Priority</b></div>
                                    <div className="ticket-data-header"><b>Actions</b></div>
                                </div>
                            {projectArray.bugs?.toReversed().map((bug) => (
                                <div className="ticket-data">
                                    <div className="ticket-name">{bug.name}</div>
                                    <div className="ticket-detail">{bug.detail}</div>
                                    <div className="ticket-status">{bug.status}</div>
                                    <div className="ticket-priority">{bug.priority}</div>
                                    <div className="ticket-actions">
                                        <Link to={"/bug/" + bug._id}>
                                            <button>Edit Ticket</button>
                                        </Link>
                                    </div>
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
        </div>
    )
}

export default ProjectEdit;