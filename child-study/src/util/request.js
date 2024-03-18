import axios from 'axios';

const servcie = axios.create({
    baseURL: '',
    timeout: 50000
})

servcie.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
)

servcie.interceptors.response.use(
    response => {
        if (response.status === 200){
            return response.data
        }
        return Promise.reject("request error.");
    },
    error => {
        return Promise.reject(error);
    }
)

export default servcie