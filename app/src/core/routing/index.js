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
  RamEdit: "/ram/:id/edit",

  Gpus: "/gpu",
  GpuCreate: "/gpu/create",
  GpuPartnerDetail: "/gpu/partner/:id",
  GpuDetail: "/gpu/:id",
  GpuPartnerEdit: "/gpu/partner/:id/edit",
  GpuEdit: "/gpu/:id/edit",

  Psus: "/psu",
  PsuCreate: "/psu/create",
  PsuDetail: "/psu/:id",
  PsuEdit: "/psu/:id/edit",
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
