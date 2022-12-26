import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchOriginalGpus = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/gpu`, {
    headers: createHeaders(headers),
  });
};

const fetchPartnerGpus = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/gpu/partner`, {
    headers: createHeaders(headers),
  });
};

const axiosCreateOriginalGpu = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/gpu`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

const axiosCreatePartnerGpu = (data) => {
  return Axios.post(`${process.env.REACT_APP_BASE_API}/gpu/partner`, {
    // headers: createHeaders(headers),
    ...data,
  }).then((res) => res);
};

export {
  fetchOriginalGpus,
  fetchPartnerGpus,
  axiosCreateOriginalGpu,
  axiosCreatePartnerGpu,
};
