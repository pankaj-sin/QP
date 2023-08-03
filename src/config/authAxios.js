import axios from "axios";
console.log("process-->",process.env.REACT_APP_API_ENDPOINT)
const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_ENDPOINT,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
    }
});

export default authAxios;