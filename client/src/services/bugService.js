import axios from 'axios';
const baseUrl = "/api/bugs"

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
} 

const addBug = async ticketObj => {
    const config = {
        headers: { Authorization: token},
    }
    const res = await axios.post(baseUrl, ticketObj, config)
    return res.data
}

const getTicket = async id => {
    const res = axios.get(baseUrl + "/" + id)
    return res.then(response => response.data)
}
const addComment = async (id, comments) => {
    const config = {
        headers: { Authorization: token},
    }
    const res = axios.put(baseUrl + "/" + id + "/addComment", {"comments":comments},config)
    return res.then(response => response.data)
}
// eslint-disable-next-line import/no-anonymous-default-export
export default {setToken, addBug, getTicket, addComment}