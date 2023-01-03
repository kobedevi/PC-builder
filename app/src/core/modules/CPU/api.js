import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpus = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/cpu`, {
    headers: createHeaders(headers),
  });
};

const fetchCpu = (id) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/cpu/${id}`, {
    headers: createHeaders(headers),
  });
};

const updateCpu = (data) => (headers) => {
  const { id } = data;
  return fetch(`${process.env.REACT_APP_BASE_API}/directors/${id}`, {
    method: "PATCH",
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

const createCpu = (data) => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/cpu`, {
    method: "POST",
    headers: createHeaders(headers),
    body: JSON.stringify(data),
  });
};

const axiosCreateCpu = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/cpu`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

export { fetchCpus, fetchCpu, updateCpu, createCpu, axiosCreateCpu };
