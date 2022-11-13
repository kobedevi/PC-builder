import { createHeaders } from "../../utils/api";

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

export {
    createCpu
}