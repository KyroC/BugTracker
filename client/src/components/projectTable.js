import './projectTable.css'
import { Link } from 'react-router-dom'

const ProjectTable = ({projects}) => {
    return (
        <div className="projectTable">
        {projects.map((project) => (
                <div className="projects" key={project.id}>
                    <div className="project-name">
                        <Link to={project._id}>{project.name}</Link>
                    </div>
                    <div className="project-details">{project.details}</div>
                    <div className="project-menu">
                        <ul>
                            <li><Link to={project._id + "/edit"}>Edit Details</Link></li>
                        </ul>
                    </div>
                </div>
            
        ))}
        </div>
    )
}

export default ProjectTable
