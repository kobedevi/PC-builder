import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchOriginalGpus = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/gpu`, {
    headers: createHeaders(headers),
  });
};

const fetchFilteredOriginalGpu = (query) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/gpu/filter/${query.replace(/[/^#\%]/g,"")}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchFilteredPartnerGpu = (query) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/gpu/partner/filter/${query.replace(/[/^#\%]/g,"")}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchCompatibleGpus = async (id) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/gpu/`);
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

const updatePartnerGpu = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/gpu/partner/${data.idGpuPartner}`,
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

const fetchPartnerGpuByIdBuilder = async (id) => {
  return await Axios.get(`${process.env.REACT_APP_BASE_API}/compatible/gpu/info/${id}`);
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

const deleteOriginalGpu = (id) => async (headers) => {
  return await Axios.delete(`${process.env.REACT_APP_BASE_API}/gpu/${id}`, {
    headers: createHeaders(headers),
  });
};

const deletePartnerGpu = (id) => async (headers) => {
  return await Axios.delete(`${process.env.REACT_APP_BASE_API}/gpu/partner/${id}`, {
    headers: createHeaders(headers),
  });
};

export {
  fetchOriginalGpus,
  fetchFilteredOriginalGpu,
  fetchFilteredPartnerGpu,
  fetchOriginalGpuById,
  fetchCompatibleGpus,
  updateOriginalGpu,
  updatePartnerGpu,
  fetchPartnerGpuById,
  fetchPartnerGpuByIdBuilder,
  fetchPartnerGpus,
  createOriginalGpu,
  createPartnerGpu,
  deleteOriginalGpu,
  deletePartnerGpu
};
