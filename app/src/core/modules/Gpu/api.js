import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchOriginalGpus = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/gpu`, {
    headers: createHeaders(headers),
  });
};

const fetchOriginalGpuById = (id) => async (headers) => {
  return await Axios.get(`${process.env.REACT_APP_BASE_API}/gpu/${id}`, {
    headers: createHeaders(headers),
  });
};

const updateOriginalGpu = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/gpu/${data.idGpu}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchPartnerGpuById = (id) => async (headers) => {
  return await Axios.get(`${process.env.REACT_APP_BASE_API}/gpu/partner/${id}`, {
    headers: createHeaders(headers),
  });
};

const fetchPartnerGpus = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/gpu/partner`, {
    headers: createHeaders(headers),
  });
};

const createOriginalGpu = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/gpu`, data, {
    headers: createHeaders(headers),
  });
};

const createPartnerGpu = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/gpu/partner`, data, {
    headers: createHeaders(headers),
  });
};

export {
  fetchOriginalGpus,
  fetchOriginalGpuById,
  updateOriginalGpu,
  fetchPartnerGpuById,
  fetchPartnerGpus,
  createOriginalGpu,
  createPartnerGpu,
};
