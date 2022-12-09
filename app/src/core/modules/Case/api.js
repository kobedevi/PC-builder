import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCases = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/case`, {
    headers: createHeaders(headers),
  });
};

const axiosCreateCase = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/case`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

export { fetchCases, axiosCreateCase };
