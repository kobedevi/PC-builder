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
    Axios.post(`${process.env.REACT_APP_BASE_API}/cpu`, {
        ...data
    }).then(() => {
        alert("successful insert")
    });
}

export {
    createCpu,
    axiosCreateCpu,
}