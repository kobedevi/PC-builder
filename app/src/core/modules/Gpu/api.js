import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchGpus = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/gpu`, {
    headers: createHeaders(headers),
  });
};

const axiosCreateGpu = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/gpu`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

export { fetchGpus, axiosCreateGpu };
