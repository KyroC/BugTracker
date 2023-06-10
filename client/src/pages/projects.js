import { useState, useEffect } from 'react'
import projectService from '../services/projectService'

const Projects = () => {
    const [projectsArray, setProjectsArray] = useState([])
    useEffect(() => {
        projectService.getAll()
        .then(res => {
            setProjectsArray(res)
        })
    })    

    return (
        <div className="projects-page">
            Project Details
            <div className="new-project">
                <button>New Project</button>
            </div>
            <div className="projects-container">
                <div className="project-container-title"></div>
                <div className="project-list">
                    {
                        projectsArray.map(project => 
                            <li>{project.name}</li>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Projects