const PossibleRoutes = Object.freeze({
  splash: "/splash",
  Login: "/login",

  Users: "/users",
  UsersEdit: "/users/edit",

  PartsOverview: "/",

  HomeParent: "/home/*",
  HomeOverview: "/home",

  Create: "create",
  Detail: ":id",
  Edit: ":id/edit",

  CpuParent: "/cpu/*",
  Cpus: "/cpu",
  CpuEdit: "/cpu/:id/edit",

  CpuCoolerParent: "/cpucooler/*",
  CpuCoolers: "/cpucooler",
  CpuCoolerEdit: "/cpucooler/:id/edit",

  MotherboardParent: "/motherboard/*",
  Motherboards: "/motherboard",
  MotherboardEdit: "/motherboard/:id/edit",

  CaseParent: "/case/*",
  Cases: "/case",
  CaseEdit: "/case/:id/edit",

  RamParent: "/ram/*",
  Ram: "/ram",
  RamEdit: "/ram/:id/edit",

  GpuParent: "/gpu/*",
  Gpus: "/gpu",
  GpuEdit: "/gpu/:id/edit",
  GpuPartnerDetail: "partner/:id",
  GpuPartnerEditRouter: "partner/:id/edit",
  GpuPartnerEdit: "/gpu/partner/:id/edit",

  PsuParent: "/psu/*",
  Psus: "/psu",
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
