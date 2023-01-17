import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchFormfactors = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/formfactor`, {
    headers: createHeaders(headers),
  });
};

const createFormfactor = (data) => async (headers) => {
  return await Axios.post(
    `${process.env.REACT_APP_BASE_API}/formfactor`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

export { fetchFormfactors, createFormfactor };
