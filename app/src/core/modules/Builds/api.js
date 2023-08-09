import Axios from "axios";

const createBuild = async (data, user) => {
  const tempData = {
      idProcessor: data.cpu.idProcessor,
      idCpuCooler: data.cpucooler.idCpuCooler,
      idMotherboard: data.motherboard.idMotherboard,
      idRam: data.ram.idRam,
      idGpu: data.gpu.idGpuPartner,
      idCase: data.case.idCase,
      idPsu: data.psu.idPsu,
      storage: data.storage
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

const fetchFeaturedBuilds = async () => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/featured/builds`);
}

const fetchBuildsOverview = async (page=0, perPage=20) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/builds/${page}/${perPage}`);
}

const fetchBuild = async (id) => {
  return await Axios.request(`${process.env.REACT_APP_BASE_API}/build/${id}`);
}


export { createBuild, fetchFeaturedBuilds, fetchBuildsOverview, fetchBuild };
