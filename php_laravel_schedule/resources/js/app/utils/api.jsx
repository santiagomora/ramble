/**
 * axios http
 */
import axios from 'axios';

export const GET = (
    options
) => axios({
        method:'get',
        url:options.endpoint,
        timeout: 2000,
        baseURL: 'http://localhost/api/',
        withCredentials:true,
        onDownloadProgress:options.download,
    })

export const POST = (
    options
) => axios({
        method: 'post',
        url: options.endpoint,
        timeout: 1000,
        data:options.data,
        onDownloadProgress:options.download,
        onUploadProgress:options.upload,
        baseURL: 'http://localhost/api/',
        withCredentials:true,
        headers:{
            'Content-type':'application/json',
            'Accept':'application/json'
        }
    });

export const DELETE = (
    options
) => axios({
        method: 'delete',
        url: options.endpoint,
        timeout: 1000,
        onDownloadProgress:options.download,
        onUploadProgress:options.upload,
        withCredentials:true,
        baseURL: 'http://localhost/api/',
    });

export const PUT = (
    options
) => axios({
        method: 'put',
        url: options.endpoint,
        data:options.data,
        timeout: 1000,
        onDownloadProgress:options.download,
        onUploadProgress:options.upload,
        withCredentials:true,
        baseURL: 'http://localhost/api/',
        headers:{
            'Content-type':'application/json'
        }
    });

let progress = {
    load:0,
    finish:true
};

axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    function (config) {
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
