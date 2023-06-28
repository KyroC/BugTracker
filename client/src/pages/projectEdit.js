import {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import projectService from '../services/projectService.js'
import './projectEdit.css'

let projects = (id) => {
    return projectService.getProject(id) 
}
const ProjectEdit = () => {
    const [projectArray, setProjectArray] = useState([])
    const { id } = useParams()
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
                Assign ProjectArray
                <div>Current Assigned ProjectArray</div>
                {projectArray.users?.map((user)=> ( 
                    <div className="assigned-user-details">
                        <div className="assigned-user-details-data">{user.name}</div>
                        <div className="assigned-user-details-data">{user.email}</div>
                        <div className="assigned-user-details-data"> {user.role}</div>
                    </div>
                 ))}
                
            </div>
            <div>
            </div>
        </div>
    )
}

export default ProjectEdit;