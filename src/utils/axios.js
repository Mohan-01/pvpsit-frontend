import axios from "axios";

// const baseURL = 'http://localhost:4000';
const baseURL = 'https://pvpsit-notify-backend.onrender.com';


export default axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Origin': 'https://pvpsit.onrender.com'
        'Access-Control-Allow-Origin': '*'
    }
})