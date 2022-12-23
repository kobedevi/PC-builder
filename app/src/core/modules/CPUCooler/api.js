import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpuCoolers = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/cpucooler`, {
    headers: createHeaders(headers),
  });
};

const createCpuCooler = (data) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/cpucooler`, {
    method: "POST",
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

const axiosCreateCpuCooler = (data) => {
  data = {
    ...data,
    // remove tempId
    cpuSockets: data.cpuSockets.map(({ tempId, ...rest }) => rest),
  };
  console.log(data);
  return Axios.post(`${process.env.REACT_APP_BASE_API}/cpucooler`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

export { fetchCpuCoolers, createCpuCooler, axiosCreateCpuCooler };
