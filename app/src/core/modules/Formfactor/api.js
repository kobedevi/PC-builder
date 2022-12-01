import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchFormfactors = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/formfactor`, {
    headers: createHeaders(headers),
  });
};

const createFormfactor = async (data) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/formfactor`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export { fetchFormfactors, createFormfactor };
