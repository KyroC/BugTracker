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
    const [projectsArray, setProjectsArray] = useState([])
    useEffect(() => {
        projects(id)
        .then(res => {
            setProjectsArray(res)
        })
    },[])
    console.log(projectsArray)
    
    
    return(
        <div className="project-grid">
            <div className="project-grid-details box1">
                <div className="project-grid-title box-a1">Details for project #1</div>
                <div className="project-grid-name box-a2">Project Name</div>
                <div className="project-grid-description a3">Project Description</div>
            </div>
            <div className="project-users box2">
                <div className="project-users-title">Assigned Personnel</div>
                <div className="project-users-table">Table</div>
            </div>
            <div className="project-bugs box3">
                <div>hi</div>
            </div>
        </div>
    )
}

export default ProjectDetails;