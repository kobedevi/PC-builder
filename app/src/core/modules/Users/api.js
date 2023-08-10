import Axios from "axios";
import { createHeaders } from "../../utils/api";

const fetchUsers = (page=0, perPage=20) => async(headers) => {        
    return await Axios.request(`${process.env.REACT_APP_BASE_API}/users/paginate/${page}/${perPage}`, {
        headers: createHeaders(headers),
    });
};

const fetchFilteredUsers = (query) => async (headers) => {
    return await Axios.get(
      `${process.env.REACT_APP_BASE_API}/users/filter/${query.replace(/[/^#\%]/g,"")}`, 
      {
        headers: createHeaders(headers),
      }
    );
};

const createUser = (data) => async(headers) => {        
    return await Axios.post(`${process.env.REACT_APP_BASE_API}/users/`, 
    data,
    {
      headers: createHeaders(headers),
    });
};

const updateUser = (data) => async(headers) => {        
    return await Axios.patch(`${process.env.REACT_APP_BASE_API}/users/${data.idUsers}`, 
    data,
    {
      headers: createHeaders(headers),
    });
};

const deleteUser = (id) => async(headers) => {        
    return await Axios.delete(`${process.env.REACT_APP_BASE_API}/users/${id}`, {
        headers: createHeaders(headers),
    });
};

export {
    fetchUsers,
    fetchFilteredUsers,
    createUser,
    updateUser,
    deleteUser
}