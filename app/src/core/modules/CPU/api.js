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

const updateCpu = (data) => async (headers) => {
  return Axios.patch(
    `${process.env.REACT_APP_BASE_API}/cpu/${data.idProcessor}`,
    {
      headers: createHeaders(headers),
      ...data,
    }
  );
};

const createCpu = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/cpu`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export { fetchCpus, fetchCpuById, updateCpu, createCpu };
