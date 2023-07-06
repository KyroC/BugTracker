import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import projectService from '../services/projectService'

let users = () => {
    return projectService.getUser()
}

const ProjectNew = () => {
        const [projectName, setProjectName] = useState("")
        const [projectDetails, setProjectDetails] = useState("")
        const [projectUsers, setProjectUsers] = useState([])
        const [userArray, setUserArray] = useState([])

        useEffect(() => {
            users()
            .then(res => {console.log(res)
            setUserArray(res)})
        },[])
       let handleProjectName = (event) => {
            event.preventDefault()
            setProjectName(event.target.value)
        }
        let handleProjectDetails = (event) => {
            event.preventDefault()
            setProjectDetails(event.target.value)
        }
        let handleProjectUsers = (event) => {
            console.log('project user:', event.target.value)
            event.preventDefault()
            setProjectUsers(event.target.value)
        }
        let handleProjectSubmit = () => {
            let projectObject = {
                name: projectName,
                details: projectDetails,
                users:[],
                bugs:[],
                creatorId:"647b17f34206aec9b5232ac3"
            }            
            projectService.create(projectObject)
        }
    
        return(
            <div>
                <h1>Create new project</h1>
                <form>
                    <label>
                        Project Name:
                        <input type="text" name="name" value={projectName} onChange={handleProjectName} /> <br />
                    </label>
                    <label>
                        Project Details:
                        <input type="text" name="details" value={projectDetails} onChange={handleProjectDetails} /> < br />
                    </label>
                    <label>
                        Assign Users:
                        <select value={projectUsers} onChange={handleProjectUsers} required size="3">
                            {userArray?.map((user) => (
                                <option value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                    </label>
                    <Link to="/projects">
                        <button onClick={handleProjectSubmit}>
                            Create Project
                        </button>
                    </Link>
                </form>
            </div>
        )
}
export default ProjectNew