import axios from "axios";

const api = axios.create({
    baseURL: 'https://api-graph.tests.grupoapok.com'
})

export default api;