import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchMotherboards = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/motherboard`, {
    headers: createHeaders(headers),
  });
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

export {
  fetchMotherboards,
  fetchMotherboardById,
  updateMotherboard,
  createMotherboard,
};
