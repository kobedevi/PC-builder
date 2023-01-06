import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpus = () => (headers) => {
  return Axios.request(`${process.env.REACT_APP_BASE_API}/cpu`, {
    headers: createHeaders(headers),
  }).catch((e) => e);
};

const fetchCpuById = (id) => (headers) => {
  return Axios.get(`${process.env.REACT_APP_BASE_API}/cpu/${id}`, {
    headers: createHeaders(headers),
  }).catch((e) => e);
};

const updateCpu = async (data) => {
  return Axios.patch(
    `${process.env.REACT_APP_BASE_API}/cpu/${data.idProcessor}`,
    {
      ...data,
    }
  ).then((res) => res);
};

const createCpu = async (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/cpu`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

export { fetchCpus, fetchCpuById, updateCpu, createCpu };
