import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpuSockets = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/cpusocket`, {
    headers: createHeaders(headers),
  });
};

const createCpuSocket = async (data) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/cpusocket`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export { fetchCpuSockets, createCpuSocket };
