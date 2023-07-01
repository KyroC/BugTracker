import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import projectService from '../services/projectService.js'
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
            <div className="project-edit-title">Edit Project</div>
            <div>
                <div>Assign Users</div>
                <div className="all-user-details">
                    <form action="#">
                        <select name="users" id="users" className="all-user-details-dropdown">
                        {userArray?.map((user) => (
                                <option className="all-user-details-name">{user.name}</option>
                        ))}
                        </select>
                        <select name="roles" id="roles" className="all-user-roles-dropdown">
                            <option>Developer</option>
                            <option>UI/UX</option>
                            <option>Admin</option>
                        </select>
                        <input type="submit" value="submit" />
                    </form>
                </div>

                <div>Current Assigned</div>
                {projectArray.users?.map((user)=> ( 
                    <div className="assigned-user-details">
                        <div className="assigned-user-details-data">{user.name}</div>
                        <div className="assigned-user-details-data">{user.email}</div>
                        <div className="assigned-user-details-data"> {user.role}</div>
                    </div>
                 ))}
                
            </div>
        </div>
    )
}

export default ProjectEdit;