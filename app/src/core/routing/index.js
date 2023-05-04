const PossibleRoutes = Object.freeze({
  splash: "/splash",
  Login: "/login",

  Users: "/users",
  UsersEdit: "/users/edit",

  PartsOverview: "/",

  Cpus: "/cpu",
  CpuCreate: "/cpu/create",
  CpuDetail: "/cpu/:id",
  CpuEdit: "/cpu/:id/edit",

  CpuCoolers: "/cpucooler",
  CpuCoolerCreate: "/cpucooler/create",
  CpuCoolerDetail: "/cpucooler/:id",
  CpuCoolerEdit: "/cpucooler/:id/edit",

  Motherboards: "/motherboard",
  MotherboardCreate: "/motherboard/create",
  MotherboardDetail: "/motherboard/:id",
  MotherboardEdit: "/motherboard/:id/edit",

  Cases: "/case",
  CaseCreate: "/case/create",
  CaseDetail: "/case/:id",
  CaseEdit: "/case/:id/edit",

  Ram: "/ram",
  RamCreate: "/ram/create",
  RamDetail: "/ram/:id",

  Gpus: "/gpu",
  GpuCreate: "/gpu/create",
  GpuDetail: "/gpu/:id",

  Psus: "/psu",
  PsuCreate: "/psu/create",
  PsuDetail: "/psu/:id",
});

// replaces : values with values from object
// e.g. route('/projects/:id', { id : 9 }) -> /movies/9
export const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export { PossibleRoutes };
