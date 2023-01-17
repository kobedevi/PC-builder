import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchManufacturers = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/manufacturer`, {
    headers: createHeaders(headers),
  });
};

const fetchManufacturerById = (id) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/manufacturer/${id}`,
    {
      headers: createHeaders(headers),
    }
  );
};

const createManufacturer = (data) => async (headers) => {
  return await Axios.post(
    `${process.env.REACT_APP_BASE_API}/manufacturer`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

export { fetchManufacturers, fetchManufacturerById, createManufacturer };
