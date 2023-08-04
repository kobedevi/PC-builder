import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchRam = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/ram`, {
    headers: createHeaders(headers),
  });
};

const fetchFilteredRam = (query) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/ram/filter/${query.replace(/[/^#\%]/g,"")}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchCompatibleRam = async (slots, idRamType) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/ram/${slots}/${idRamType}`);
};

const fetchRamById = (id) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/ram/${id}`,
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchRamByIdBuilder = async (id) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/compatible/ram/info/${id}`
  );
};

const updateRam = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/ram/${data.idRam}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const createRam = (data) => async (headers) => {
  return await Axios.post(
    `${process.env.REACT_APP_BASE_API}/ram`, 
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const deleteRam = (id) => async (headers) => {
  return await Axios.delete(`${process.env.REACT_APP_BASE_API}/ram/${id}`, {
    headers: createHeaders(headers),
  });
};

export { fetchRam, fetchCompatibleRam, fetchFilteredRam, createRam, fetchRamById, fetchRamByIdBuilder, updateRam, deleteRam };
