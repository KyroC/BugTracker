import axios from 'axios';
const baseUrl = "/api/bugs"

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
} 

const addBug = async ticketObj => {
    const res = axios.post(baseUrl, ticketObj)
    return res.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {setToken, addBug}