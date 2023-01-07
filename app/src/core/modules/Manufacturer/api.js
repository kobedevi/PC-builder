import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchManufacturers = () => (headers) => {
  return Axios.request(`${process.env.REACT_APP_BASE_API}/manufacturer`, {
    headers: createHeaders(headers),
  });
};

const fetchManufacturerById = (id) => (headers) => {
  return Axios.get(`${process.env.REACT_APP_BASE_API}/manufacturer/${id}`, {
    headers: createHeaders(headers),
  });
};

const createManufacturer = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/manufacturer`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export { fetchManufacturers, fetchManufacturerById, createManufacturer };
