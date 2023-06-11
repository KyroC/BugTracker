import './projectTable.css'

const ProjectTable = ({projects}) => {
    return (
        <div className="projectTable">
        {projects.map((project) => (
                <div className="projects" key={project.id}>
                    <div className="project-name">{project.name}</div>
                    <div className="project-details">{project.details}</div>
                    <div className="project-menu">
                        <ul>
                            <li><a href="edit-project">Edit Details</a></li>
                            <li><a href="manage-project-users">Manage Users</a></li>
                        </ul>
                    </div>
                </div>
            
        ))}
        </div>
    )
}

export default ProjectTable
