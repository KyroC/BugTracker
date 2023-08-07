import axios from 'axios';
const usersUrl = "/api/users"
const bugsUrl = "/api/bugs"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getUserProjects = () => {
    const config = {
        headers: { Authorization: token},
    }
    const request = axios.get(usersUrl + "/projects", config)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getUserProjects, setToken}