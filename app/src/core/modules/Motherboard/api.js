import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchMotherboards = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/motherboard`, {
    headers: createHeaders(headers),
  });
};

const fetchFilteredMotherboards = (query) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/motherboard/filter/${query.replace(/[/^#\%]/g,"")}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const fetchCompatibleMotherboard = (id) => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/motherboard/${id}`);
};

const fetchMotherboardById = (id) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/motherboard/${id}`,
    {
      headers: createHeaders(headers),
    }
  );
};

const updateMotherboard = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/motherboard/${data.idMotherboard}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const createMotherboard = (data) => async (headers) => {
  return await Axios.post(
    `${process.env.REACT_APP_BASE_API}/motherboard`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const deleteMotherboard = (id) => async (headers) => {
  return await Axios.delete(`${process.env.REACT_APP_BASE_API}/motherboard/${id}`, {
    headers: createHeaders(headers),
  });
};

export {
  fetchMotherboards,
  fetchCompatibleMotherboard,
  fetchFilteredMotherboards,
  fetchMotherboardById,
  updateMotherboard,
  createMotherboard,
  deleteMotherboard
};
