import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchCases = () => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/case`, {
    headers: createHeaders(headers),
  });
};

const fetchCompatibleCases = (width, height, depth) => async (headers) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/compatible/case/${width}/${height}/${depth}`);
};

const fetchFilteredCases = (query) => async (headers) => {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/case/filter/${query.replace(/[/^#\%]/g,"")}`, 
    {
      headers: createHeaders(headers),
    }
  );
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

const deleteCase = (id) => async (headers) => {
  return await Axios.delete(`${process.env.REACT_APP_BASE_API}/case/${id}`, {
    headers: createHeaders(headers),
  });
};

export { fetchCases, fetchCompatibleCases, fetchFilteredCases, createCase, fetchCaseById, updateCase, deleteCase };
