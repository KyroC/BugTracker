import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import projectService from '../services/projectService'
import ProjectTable from '../components/projectTable'
import ProjectTableSearch from '../components/projectTableSearch'
import "./projects.css"

const projectList = () => {
    return projectService.getAll()
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
        <div className="projects-page">
            Project Details
            <div className="new-project">
                <Link to="/projects/new">
                    <button>New Project</button>
                </Link>
            </div>
            <div className="projects-container">
                <div className="project-container-title">Projects</div>
                <div className="project-container-searchbar">
                    <ProjectTableSearch callback={searchValue => setSearchValue(searchValue)}/>
                    
                </div>
                <div className="project-list-container">
                    < ProjectTable projects={filteredArray}/>
                </div>
            </div>
        </div>
    )
}

export default Projects