import axios from 'axios';
const usersUrl = "/api/users"
const bugsUrl = "/api/bugs"

const getUserProjects = (id) => {
    const request = axios.get(usersUrl + "/" + id + "/projects")
    console.log(id)
    return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {getUserProjects, }