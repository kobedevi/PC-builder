import Axios from "axios";
import { createHeaders } from "../../utils/api";

const fetchUsers = (page=0, perPage=20) => async(headers) => {        
    return await Axios.request(`${process.env.REACT_APP_BASE_API}/users/paginate/${page}/${perPage}`, {
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
    deleteUser
}