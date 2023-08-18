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
            <div className="project-grid-details box1">
                <div className="project-grid-title box-a1">
                    <div><h1>Details for project #1</h1></div> 
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
            <div className="project-users box2">
                <div className="project-users-title">
                    <div><b>Assigned Personnel</b></div>
                </div>
                {projectArray.users?.map((user)=> (
                    <div className="project-users-table">
                        <div>{user.name}</div>
                        </div> 
                        ))}
            </div>
            <div className="project-bugs box3">
                <div className="project-bugs-title"><b>Tickets/Bugs for this project</b></div>
            {projectArray.bugs?.map((bug)=> (
                <div className="projects-bugs-table">
                    <div>{bug.name}</div>
                </div>
                
            ))}
        </div>
        </div>
    )
}

export default ProjectDetails;