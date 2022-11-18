import { createHeaders } from "../../utils/api";
import Axios from 'axios'

const fetchManufacturers = () => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/manufacturer`, {
        headers: createHeaders(headers),
    });
}

const createManufacturer = (data) => (headers) => {
    return fetch(`${process.env.REACT_APP_BASE_API}/manufacturer`, {
        method:'POST',
        headers: createHeaders(headers),
        body: JSON.stringify(data),
    });
}

export {
    fetchManufacturers,
    createManufacturer,
}