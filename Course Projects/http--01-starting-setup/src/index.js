import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//instances

//Global config
axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com';
axios.defaults.headers.common['Authorization'] = 'Auth token form index';
axios.defaults.headers.post['Content-Type']='application/json';
//Interceptors
axios.interceptors.request.use(request => {
    console.log(request);
    //Edit -> Add header or similar
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

axios.interceptors.response.use(request => {
    console.log(request);
    //Edit -> Add header or similar
    return request;
}, error => {
    console.log(error);
    return Promise.reject(error);
});

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();
