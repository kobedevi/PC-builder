import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpuCoolers = () => (headers) => {
  return Axios.request(`${process.env.REACT_APP_BASE_API}/cpucooler`, {
    headers: createHeaders(headers),
  });
};

const createCpuCooler = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/cpucooler`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export { fetchCpuCoolers, createCpuCooler };
