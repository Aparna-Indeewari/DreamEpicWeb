import axios from "axios";

export async function get(url, options = {}) {
    try {
        const response = await axios.get(`${url}`, options);
        return response;
    } catch (e) {
        throw e;
    }
}

export async function post(url, body, options = {}) {
    try {
        const response = axios.post(`${url}`, body, options);
        return response;
    } catch (e) {
        throw e;
    }
}

export async function put(url, body, options = {}) {
    try {
        const response = axios.put(`${url}`, body, options);
        return response;
    } catch (e) {
        throw e;
    }
}
