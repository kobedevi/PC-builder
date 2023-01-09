import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchOriginalGpus = () => async (headers) => {
  return Axios.request(`${process.env.REACT_APP_BASE_API}/gpu`, {
    headers: createHeaders(headers),
  });
};

const fetchPartnerGpus = () => async (headers) => {
  return Axios.request(`${process.env.REACT_APP_BASE_API}/gpu/partner`, {
    headers: createHeaders(headers),
  });
};

const createOriginalGpu = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/gpu`, {
    headers: createHeaders(headers),
    ...data,
  });
};

const createPartnerGpu = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/gpu/partner`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export {
  fetchOriginalGpus,
  fetchPartnerGpus,
  createOriginalGpu,
  createPartnerGpu,
};
