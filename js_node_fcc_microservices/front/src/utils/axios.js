import axios from 'axios';

const {protocol,host} = (typeof window !== 'undefined')
    ? window.location
    : {protocol:null,host:null};

const isProduction = process.env.NODE_ENV === 'production';

const BASE_URL = (protocol && host && isProduction )
    ? `${protocol}//${host}`
    : 'http://127.0.0.1:3000';

const API_BASE = `${BASE_URL}/api`;

const GET = (
    options
) => {
    return axios({
        method:'get',
        timeout: 10000,
        baseURL: API_BASE,
        crossDomain: !isProduction,
        withCredentials: !isProduction,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            //'Content-type':'application/json',
            'Accept':'application/json'
        },
        ...options
    });
}

const POST = (
    options
) => {
    return axios({
        method: 'post',
        timeout: 8000,
        baseURL: API_BASE,
        crossDomain:true,
        withCredentials:true,
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
            //s'Content-type':'application/json',
            'Accept':'application/json'
        },
        ...options
    });
}

const index = {
    POST,
    GET,
    API_BASE,
    BASE_URL
}

export default index;
