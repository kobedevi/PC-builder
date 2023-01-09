import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchRam = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/ram`, {
    headers: createHeaders(headers),
  });
};

const createRam = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/ram`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export { fetchRam, createRam };
