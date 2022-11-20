import { createHeaders } from "../../utils/api";
import Axios from "axios";

const fetchManufacturers = () => (headers) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/manufacturer`, {
    headers: createHeaders(headers),
  });
};

const createManufacturer = async (data) => {
  return fetch(`${process.env.REACT_APP_BASE_API}/manufacturer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
};

export { fetchManufacturers, createManufacturer };
