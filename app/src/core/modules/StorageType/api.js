import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchStorageTypes = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/storagetypes`, {
    headers: createHeaders(headers),
  });
};

const createStorageType = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/storagetypes`, data, {
    headers: createHeaders(headers),
  });
};

export { fetchStorageTypes, createStorageType };
