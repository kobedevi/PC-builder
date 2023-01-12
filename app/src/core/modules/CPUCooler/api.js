import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCpuCoolers = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/cpucooler`, {
    headers: createHeaders(headers),
  });
};

const fetchCpuCoolerById = (id) => async (headers) => {
  console.log(id);
  return await Axios.get(`${process.env.REACT_APP_BASE_API}/cpucooler/${id}`, {
    headers: createHeaders(headers),
  }).catch((e) => e);
};

const updateCpuCooler = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/cpucooler/${data.idProcessor}`,
    {
      headers: createHeaders(headers),
      ...data,
    }
  );
};

const createCpuCooler = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/cpucooler`, {
    headers: createHeaders(headers),
    ...data,
  });
};

export {
  fetchCpuCoolers,
  createCpuCooler,
  fetchCpuCoolerById,
  updateCpuCooler,
};
