import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchMotherboards = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/motherboard`, {
    headers: createHeaders(headers),
  });
};

const createMotherboard = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/motherboard`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export { fetchMotherboards, createMotherboard };
