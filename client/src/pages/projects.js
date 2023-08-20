import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import projectService from '../services/projectService'
import userService from '../services/userService'
import ProjectTable from '../components/projectTable'
import ProjectTableSearch from '../components/projectTableSearch'
import "./projects.css"

const projectList = () => {
    //change id to current loggedin user
    return userService.getUserProjects()
}

const Projects = () => {
    const [projectsArray, setProjectsArray] = useState([])
    const [filteredArray, setFilteredArray] = useState([])
    const [searchValue, setSearchValue] = useState("")

    console.log("searchValue", searchValue)
    useEffect(() => {
       projectList()
        .then(res => {
            setProjectsArray(res)
            setFilteredArray(res)
            console.log(res)
        })
    },[])   

    useEffect(() => {
        console.log(projectsArray)
        console.log(searchValue)
        setFilteredArray(
            projectsArray?.filter(project => project.name.includes(searchValue)))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[searchValue])

    return (
        <div className="projects-page-container">
            <div className="projects-page">
                <div className="projects-page-top">
                    <h4>Project Details</h4>
                </div>
                <div className="projects-container">
                    <div className="project-container-searchbar">
                        <ProjectTableSearch callback={searchValue => setSearchValue(searchValue)}/>
                    </div>
                    <div className="project-list-container">
                        <div className="projectTable">
                            <div className="projects projects-header">
                                <div className="project-name">
                                    <h4>Project Name</h4>
                                </div>
                                <div className="project-details">
                                    <h4>Project Details</h4>
                                </div>
                                <div className="project-menu">
                                    <h4>Actions</h4>
                                </div>
                            </div>
                            < ProjectTable projects={filteredArray}/>
                        </div>
                    </div>
                </div>
                <div className="new-project">
                        <Link to="/projects/new">
                            <button>New Project</button>
                        </Link>
                    </div>
            </div>
        </div>
    )
}

export default Projects