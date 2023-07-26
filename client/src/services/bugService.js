import axios from 'axios';
const baseUrl = "/api/bugs"

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
} 

const addBug = async ticketObj => {
    const res = axios.post(baseUrl, ticketObj)
    return res.then(response => response.data)
}

const getTicket = async id => {
    const res = axios.get(baseUrl + "/" + id)
    return res.then(response => response.data)
}
const addComment = (id, comments) => {
    const res = axios.put(baseUrl + "/" + id + "/addComment", {"comments":comments})
    return res.then(response => console.log(response))
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {setToken, addBug, getTicket, addComment}