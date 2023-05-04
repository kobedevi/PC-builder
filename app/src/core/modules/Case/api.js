import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCases = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/case`, {
    headers: createHeaders(headers),
  });
};

const fetchCaseById = (id) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/case/${id}`,
    {
      headers: createHeaders(headers),
    }
  );
};

const updateCase = (data) => async (headers) => {
  return await Axios.patch(
    `${process.env.REACT_APP_BASE_API}/case/${data.idCase}`,
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

const createCase = (data) => async (headers) => {
  return await Axios.post(
    `${process.env.REACT_APP_BASE_API}/case`, 
    data,
    {
      headers: createHeaders(headers),
    }
  );
};

export { fetchCases, createCase, fetchCaseById, updateCase };
