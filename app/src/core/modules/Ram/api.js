import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchRam = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/ram`, {
    headers: createHeaders(headers),
  });
};

const fetchRamById = (id) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/ram/${id}`,
    {
      headers: createHeaders(headers),
    }
  );
};

const updateRam = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/ram/${data.idRam}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const createRam = (data) => async (headers) => {
  return await Axios.post(
    `${process.env.REACT_APP_BASE_API}/ram`, 
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

export { fetchRam, createRam, fetchRamById, updateRam };
