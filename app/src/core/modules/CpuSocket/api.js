import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpuSockets = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/cpusocket`, {
    headers: createHeaders(headers),
  });
};

const createCpuSocket = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/cpusocket`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export { fetchCpuSockets, createCpuSocket };
