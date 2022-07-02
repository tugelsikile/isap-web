import Axios from 'axios';

export const authServices = async (token, data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token, "Accept" : "application/json" },
        method : "post", data : data, url : "http://sistem.rst.net.lan/api/v4/login"
    });
    return Promise.resolve(request);
};

export const me = async (token) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token},
        method : "get", url : "http://sistem.rst.net.lan/api/v4/auth/users/current"
    });
    return Promise.resolve(request);
};

export const absensiThisDay = async (token,data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token},
        method : "post",data : data, url : "http://sistem.rst.net.lan/api/v4/auth/users/attendances"
    });
    return Promise.resolve(request);
};