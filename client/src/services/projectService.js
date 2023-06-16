import axios from 'axios'
const baseUrl = '/api/projects'

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

const create = async newObject => {
    const config = {
        headers: { Authorization: token},
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data

}

// eslint-disable-next-line import/no-anonymous-default-export
export default {setToken, create, getAll, getProject}