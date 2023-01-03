import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchPsus = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/psu`, {
    headers: createHeaders(headers),
  });
};

const axiosCreatePsu = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/psu`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

export { fetchPsus, axiosCreatePsu };
