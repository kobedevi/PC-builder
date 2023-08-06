import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchStorage = (page=0, perPage=20) => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/storage/${page}/${perPage}`, {
    headers: createHeaders(headers),
  });
};

const fetchStorageById = (id) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/storage/${id}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchStorageByIdBuilder = async (id) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/compatible/storage/info/${id}`
  );
};

const fetchFilteredStorage = (query) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/storage/filter/${query.replace(/[/^#\%]/g,"")}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchCompatibleStorage = async (storage, page=0, perPage=20) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/storage/${storage}/${page}/${perPage}`);
};

const updateStorage = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/storage/${data.idStorage}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const createStorage = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/storage`, data, {
    headers: createHeaders(headers),
  });
};

const deleteStorage = (id) => async (headers) => {
  return await Axios.delete(`${process.env.REACT_APP_BASE_API}/storage/${id}`, {
    headers: createHeaders(headers),
  });
};

export { fetchStorage, fetchStorageById, fetchStorageByIdBuilder, fetchFilteredStorage, fetchCompatibleStorage, updateStorage, createStorage, deleteStorage };
