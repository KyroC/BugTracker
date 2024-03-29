import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import projectService from '../services/projectService';

const RoleForm = (props) => {
    const [assignUser, setAssignUser] = useState()
    const [assignRole, setAssignRole] = useState()

    const handleChangeUser = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setAssignUser(event.target.value)
    }
    const handleChangeRole = (event) => {
        event.preventDefault()
        console.log(event.target.value)
        setAssignRole(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        projectService.addProjectUser(props.projectId, assignUser)
        props.projects(props.projectId).then(res => {
            props.setProjectArray(res)
        }
        )
    }
    return (
        <div className="all-user-details">
                    <form action="#">
                        <select name="users" id="users" className="all-user-details-dropdown"
                        required size="3" onChange={handleChangeUser}>
                        {props.userArray?.map((user) => (
                                <option className="all-user-details-name" value={user.id}>{user.name}</option>
                        ))}
                        </select>
                        {/* disabling select role function as roles are admin side 
                        <select name="roles" id="roles" className="all-user-roles-dropdown"
                        required size="3" onChange={handleChangeRole}>
                            <option value="Developer">Developer</option>
                            <option value="UI/UX">UI/UX</option>
                            <option value="Admin">Admin</option>
                        </select>
                        */}
                        <button type="submit" value="submit" onClick={handleSubmit}>Submit </button>
                    </form>
                </div>
    )
}

export default RoleForm;