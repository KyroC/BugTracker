import "./projectDetails.css"
import Bugcard from "../components/Bugcard"

let statuses = ["To Do", "In Progress", "To Review", "Completed"]
//sample data
let bugs = [{
    status: "To Do",
    title: "bug1",
    author: "author1",
    description: "description1",
    team: "UI",
    comment: 5,
},
{
    status: "In Progress",
    title: "bug2",
    author: "author2",
    description: "description2",
    team: "UI",
    comment: 4,
},
{
    status: "To Review",
    title: "bug3",
    author: "author3",
    description: "description3",
    team: "UI",
    comment: 5,
},
{
    status: "Completed",
    title: "bug4",
    author: "author4",
    description: "description4",
    team: "UI",
    comment: 5,
},
{
    status: "To Do",
    title: "bug5",
    author: "author5",
    description: "description5",
    team: "UI",
    comment: 5,
},
{
    status: "To Do",
    title: "bug6",
    author: "author6",
    description: "description6",
    team: "Developers",
    comment: 5,
}]
const ProjectDisplay = () => {
    return(statuses.map(status => 
    <div className="bug-card">
        <div className="bug-status">
            <h2>{status}</h2>
            <button>Add New</button>
            </div> 
        <Bugcard bugs={bugs.filter(bug => bug.status === status)} />
    </div>)
    )
}
 

const ProjectDetails = () => {
    return(
        <div className="bug-grid">
            <ProjectDisplay />
        </div>
    )
}

export default ProjectDetails;