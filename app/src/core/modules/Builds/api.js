import Axios from "axios";
import { createHeaders } from "core/utils/api";

const fetchBuildInfo = (id) => async (headers) =>  {
  return await Axios.get(
    `${process.env.REACT_APP_BASE_API}/auth/builds/${id}`, 
    {
      headers: createHeaders(headers),
    }
  );
};

const createBuild = async (data, user) => {

  // https://stackoverflow.com/questions/62425038/how-to-count-duplicate-object-in-js

  let storageOutput = [];
  if(data.storage.length > 0) {
    storageOutput = data.storage.reduce((acc, { idStorage }, index, array) => {
      acc[`${idStorage}`] = {
        idStorage,
        amount: (acc[`${idStorage}`] ? acc[`${idStorage}`].amount : 0) + 1
      };
    
      return index === (array.length - 1) ? Object.values(acc) : acc;
    }, {});
  }

  const tempData = {
      idProcessor: data.cpu.idProcessor,
      idCpuCooler: data.cpucooler.idCpuCooler,
      idMotherboard: data.motherboard.idMotherboard,
      idRam: data.ram.idRam,
      idGpu: data.gpu.idGpuPartner,
      idCase: data.case.idCase,
      idPsu: data.psu.idPsu,
      storage: storageOutput
  };
  if(user?.token) {
    return await Axios.post(
      `${process.env.REACT_APP_BASE_API}/auth/builds`, 
      tempData,
      {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${user.token}`,
        }
      }
    )
  }
  return await Axios.post(
    `${process.env.REACT_APP_BASE_API}/compatible/builds`, 
    tempData,
    {
      headers: {
          "Content-Type": "application/json;charset=UTF-8",
      }
    }
  )
};

const updateCurrentBuild = async (id, data, user) => {

  // https://stackoverflow.com/questions/62425038/how-to-count-duplicate-object-in-js

  let storageOutput = [];
  if(data.storage.length > 0) {
    storageOutput = data.storage.reduce((acc, { idStorage }, index, array) => {
      acc[`${idStorage}`] = {
        idStorage,
        amount: (acc[`${idStorage}`] ? acc[`${idStorage}`].amount : 0) + 1
      };
    
      return index === (array.length - 1) ? Object.values(acc) : acc;
    }, {});
  }

  const tempData = {
      idProcessor: data.cpu.idProcessor,
      idCpuCooler: data.cpucooler.idCpuCooler,
      idMotherboard: data.motherboard.idMotherboard,
      idRam: data.ram.idRam,
      idGpu: data.gpu.idGpuPartner,
      idCase: data.case.idCase,
      idPsu: data.psu.idPsu,
      storage: storageOutput
  };
  if(user.token) {
    return await Axios.patch(
      `${process.env.REACT_APP_BASE_API}/auth/builds/${id}`, 
      tempData,
      {
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${user.token}`,
        }
      }
    )
  }
};

const fetchFeaturedBuilds = async () => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/featured/builds`);
}

const fetchBuildsOverview = async (page=0, perPage=20) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/builds/${page}/${perPage}`);
}

const fetchBuildsByUser = async (id, page=0, perPage=20) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/builds/user/${id}/${page}/${perPage}`);
}

const fetchBuild = async (id) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/build/${id}`);
}


export { fetchBuildInfo, createBuild, updateCurrentBuild, fetchFeaturedBuilds, fetchBuildsOverview, fetchBuildsByUser, fetchBuild };
