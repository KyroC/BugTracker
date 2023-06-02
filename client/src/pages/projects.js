import "./projects.css"

let statuses = ["To Do", "In Progress", "To Review", "Completed"]

const ProjectDisplay = () => {
    return(statuses.map(status => 
    <div className="project-card">
        {status}
    </div>)
    )
}
 

const Projects = () => {
    return(
        <div className="projects">
            <div className="projects-container">
                <ProjectDisplay />
            </div>
        </div>
    )
}

export default Projects;