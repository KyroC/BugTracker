import axios from 'axios'
const baseUrl = '/api/projects'
const userUrl = '/api/users'

let token = null

const setToken = newToken => {
    token =`Bearer ${newToken}`
}
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)

  }
const getProject = (id) => {
    const request = axios.get(baseUrl + "/" + id)
    return request.then(response => response.data)
}
const getUser = () => {
    const request = axios.get(userUrl)
    return request.then(response => response.data)
}
const addProjectUser = (projectId, assignUser) => {
    const res = axios.put(baseUrl + "/" + projectId + "/addUsers", {
        "userId": assignUser
    })
    return res
        .then(axios.put(userUrl + "/" + assignUser + "/addProject", {projectId}))
        .then(res => res.data)
        
}
const deleteProjectUser = (projectId, deleteUser) => {
    const res = axios.delete(baseUrl + "/" + projectId + "/deleteUsers", {
        data: {"userId": deleteUser}
    })
    return res
        .then(axios.delete(userUrl + "/" + deleteUser + "/deleteProject", {
            data:{"projectId": projectId}
        }))
        .then(res => res.data)
}
const deleteProject = (projectId) => {
    // eslint-disable-next-line no-unused-vars
    const res = axios.delete(baseUrl + "/" + projectId)
}
const addTicket = (projectId, bugId) => {
    const res = axios.put(baseUrl + "/" + projectId + "/addBugs", {bugId})
    return res.then(response => response.data)        
}
const create = async newObject => {
    const config = {
        headers: { Authorization: token},
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {setToken, create, getAll, getProject, getUser, addProjectUser, deleteProjectUser, deleteProject, addTicket}