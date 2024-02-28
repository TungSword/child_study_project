import axios from 'axios';

const servcie = axios.create({
    baseURL: '',
    timeout: 5000
})

servcie.interceptors.request.use(
    config => {
        console.log("interceptors.request config", config)
    },
    error => {
        console.log("interceptors.request error", error)
    }
)

servcie.interceptors.response.use(
    response => {
        console.log("interceptors.response response", response)
        return response
    },
    error => {
        console.log("interceptors.response error", error)
        return error
    }
)

export default servcie