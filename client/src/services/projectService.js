import axios from 'axios'
const baseUrl = '/api/projects'

let token = null

const setToken = newToken => {
    token =`Bearer ${newToken}`
}

const create = async newObject => {
    const config = {
        headers: { Authorization: token},
    }
    const response = await axios.post(baseUrl, newObject, config)
    return response.data

}

export default {setToken, create}