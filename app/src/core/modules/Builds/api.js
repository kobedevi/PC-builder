import Axios from "axios";

const createBuild = async (data, user) => {
    const tempData = {
        idProcessor: data.cpu.idProcessor,
        idCpuCooler: data.cpucooler.idCpuCooler,
        idMotherboard: data.motherboard.idMotherboard,
        idRam: data.ram.idRam,
        idGpu: data.gpu.idGpu,
        idCase: data.case.idCase,
        idPsu: data.psu.idPsu,
        storage: data.storage
    };
    if(user?.token) {
        console.log('token');
        return await Axios.post(
          `${process.env.REACT_APP_BASE_API}/auth/builds`, 
          tempData,
          {
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Bearer ${user.token}`,
            }
          }
        );
    }
    return await Axios.post(
        `${process.env.REACT_APP_BASE_API}/compatible/builds`, 
        tempData,
        {
          headers: {
              "Content-Type": "application/json;charset=UTF-8",
          }
        }
      );
};


export { createBuild, };
