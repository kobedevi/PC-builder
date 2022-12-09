import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchRam = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/ram`, {
    headers: createHeaders(headers),
  });
};

const axiosCreateRam = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/ram`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

export { fetchRam, axiosCreateRam };
