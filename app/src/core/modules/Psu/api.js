import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchPsus = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/psu`, {
    headers: createHeaders(headers),
  });
};

const createPsu = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/psu`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export { fetchPsus, createPsu };
