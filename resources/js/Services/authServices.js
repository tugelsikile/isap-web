import Axios from 'axios';
export const authServices = async (token, data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token, "Accept" : "application/json" },
        method : "post", data : data, url : process.env.MIX_APP_URL + "/api/v4/login"
    });
    return Promise.resolve(request);
};

export const me = async (token) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token},
        method : "get", url : process.env.MIX_APP_URL +  "/api/v4/auth/users/current"
    });
    return Promise.resolve(request);
};

export const absensiThisDay = async (token,data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token},
        method : "post",data : data, url : process.env.MIX_APP_URL + "/api/v4/auth/users/attendances"
    });
    return Promise.resolve(request);
};

export const sendFoto = async (token,data) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token},
        method : "post",data : data, url : window.origin + "/api/test"
    });
    return Promise.resolve(request);
};

export const checkShift = async (token) => {
    let request = Axios({
        headers : { "Authorization" : "Bearer " + token},
        method : "post", url : process.env.MIX_APP_URL + "/api/v4/auth/users/attendances/check-shift"
    });
    return Promise.resolve(request);
};
