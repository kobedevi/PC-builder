import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchMotherboards = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/motherboard`, {
    headers: createHeaders(headers),
  });
};

// const createCpu = (data) => (headers) => {
//     return fetch(`${process.env.REACT_APP_BASE_API}/cpu`, {
//         method:'POST',
//         headers: createHeaders(headers),
//         body: JSON.stringify(data),
//     });
// }

const axiosCreateMotherboard = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/motherboard`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

export {
  fetchMotherboards,
  axiosCreateMotherboard,
  // axiosCreateCpu,
};
