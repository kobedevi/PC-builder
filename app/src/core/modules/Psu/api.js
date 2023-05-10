import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchPsus = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/psu`, {
    headers: createHeaders(headers),
  });
};

const fetchPsuById = (id) => async (headers) => {
  return await Axios.get(`${process.env.REACT_APP_BASE_API}/psu/${id}`, {
    headers: createHeaders(headers),
  });
};


const updatePsu = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/psu/${data.idPsu}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const createPsu = (data) => async (headers) => {
  return await Axios.post(`${process.env.REACT_APP_BASE_API}/psu`, data, {
    headers: createHeaders(headers),
  });
};


export { fetchPsus, fetchPsuById, updatePsu, createPsu };
