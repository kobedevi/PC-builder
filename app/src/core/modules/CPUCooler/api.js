import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpuCoolers = (page=0, perPage=20) => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/cpucooler/paginate/${page}/${perPage}`, {
    headers: createHeaders(headers),
  });
};

const fetchCompatibleCpuCoolers = async (id, page=0, perPage=20) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/cpucooler/${id}/${page}/${perPage}`);
};

const fetchCpuCoolerById = (id) => async (headers) => {
  return await Axios.get(`${process.env.REACT_APP_BASE_API}/cpucooler/${id}`, {
    headers: createHeaders(headers),
  });
};

const fetchCpuCoolerByIdBuilder = async (id) => {
  return await Axios.get(`${process.env.REACT_APP_BASE_API}/compatible/cpucooler/info/${id}`)
};

const fetchFilteredCpuCoolers = (query) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/cpucooler/filter/${query.replace(/[/^#\%]/g,"")}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const updateCpuCooler = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/cpucooler/${data.idCpuCooler}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const createCpuCooler = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/cpucooler`, data, {
    headers: createHeaders(headers),
  });
};

const deleteCpuCooler = (id) => async (headers) => {
  return await Axios.delete(`${process.env.REACT_APP_BASE_API}/cpucooler/${id}`, {
    headers: createHeaders(headers),
  });
};

export {
  fetchCpuCoolers,
  fetchCompatibleCpuCoolers,
  createCpuCooler,
  fetchCpuCoolerById,
  fetchCpuCoolerByIdBuilder,
  fetchFilteredCpuCoolers,
  updateCpuCooler,
  deleteCpuCooler
};
