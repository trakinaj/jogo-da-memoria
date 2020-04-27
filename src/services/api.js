import axios from 'axios'

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL //aqui fica a url do backend
})

export default api