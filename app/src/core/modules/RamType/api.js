import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchRamTypes = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/ramtypes`, {
    headers: createHeaders(headers),
  });
};

const createRamType = (data) => async (headers) => {
  return await Axios.post(
    `${process.env.REACT_APP_BASE_API}/ramtypes`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

export { fetchRamTypes, createRamType };
