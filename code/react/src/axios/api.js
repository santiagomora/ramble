import axios from 'axios';

const {protocol,host} = (typeof window !== 'undefined')
    ? window.location
    : {protocol:null,host:null};

const isProduction = process.env.NODE_ENV === 'production';

const BASE_URL = (protocol && host && isProduction)
    ? `${protocol}//${host}`
    : 'http://localhost:3001';

const API_BASE = `${BASE_URL}/`;

const config = {
    timeout: 10000,
    baseURL: API_BASE,
    crossDomain: true,
    withCredentials: false
};

export default function axiosRequest(options)
{
    return axios({
        ...config,
        ...options
    })
}
