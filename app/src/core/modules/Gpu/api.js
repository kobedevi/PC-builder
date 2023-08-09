import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchOriginalGpus = (page=0, perPage=20) => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/gpu/paginate/${page}/${perPage}`, {
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

const fetchCompatibleGpusFilter = async (query) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/gpu/filter/${query.replace(/[/^#\%]/g,"")}`);
};

const fetchCompatibleGpus = async (page=0, perPage=20) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/gpu/${page}/${perPage}`);
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

const fetchPartnerGpus = (page=0, perPage=20) => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/gpu/partner/paginate/${page}/${perPage}`, {
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
  fetchCompatibleGpusFilter,
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
