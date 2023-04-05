import {get, post} from "../utils/httpService";

function getToken() {
    return localStorage.getItem("authToken")
}

export async function addImages(images) {
    const authToken = getToken();
    const headers = {Authorization: `Bearer ${authToken}`};
    const body = {images : images}
    try {
        const response = await post(`http://localhost:5000/add_images`, body, {headers: headers});
        return response;
    } catch (e) {
        throw e
    }
}

export async function getProfile() {
    const authToken = getToken();
    const headers = {Authorization: `Bearer ${authToken}`}
    try {
        const response = await get('http://localhost:6500/api/profile/profile', {headers: headers});
        return response;
    } catch (e) {
        throw e;
    }
}

export async function loginUser(req) {
    try {
        const response = await post('http://localhost:6500/api/auth/login', req, {});
        return response;
    } catch (e) {
        throw e;
    }
}

export async function registerUser(req) {
    try {
        const response = await post('http://localhost:6500/api/auth/reg', req, {});
        return response;
    } catch (e) {
        throw e;
    }
}
