import { uploadHeaders } from "../../utils/api";
import Axios from "axios";

const uploadImage = (formData) => async (headers) => {
    console.log(formData);
    return Axios.post(
        `${process.env.REACT_APP_BASE_API}/uploads`, 
        formData,
        {
          headers: uploadHeaders(headers),
        }
    );
}

export {
    uploadImage,
}