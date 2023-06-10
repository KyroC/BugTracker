import './projectTable.css'

const ProjectTable = ({projects}) => {
    return (
        <div className="projectTable">
        {projects.map((project) => (
                <div className="project" key={project.id}>
                    <div className="project-name">{project.name}</div>
                    <div className="project-details">{project.details}</div>
                    <div className="project-details-menu">
                        <ul>
                            <li>Edit Details</li>
                            <li>Manage Users</li>
                        </ul>
                    </div>
                </div>
            
        ))}
        </div>
    )
}

export default ProjectTable
