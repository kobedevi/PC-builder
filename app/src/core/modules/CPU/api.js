import { createHeaders } from "../../utils/api";
import Axios from 'axios'

const fetchCpu = () => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/cpu`, {
        headers: createHeaders(headers),
    });
}

const createCpu = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/cpu`, {
        method:'POST',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

const axiosCreateCpu = (data) => {
    return Axios.post(`${process.env.REACT_APP_BASE_API}/cpu`, {
        // headers: createHeaders(headers),
        ...data,
    })
    .then((res) => res.json())
    .then((data) => data);
}

export {
    createCpu,
    axiosCreateCpu,
}