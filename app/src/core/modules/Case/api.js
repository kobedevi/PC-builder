import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCases = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/case`, {
    headers: createHeaders(headers),
  });
};

const createCase = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/case`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export { fetchCases, createCase };
