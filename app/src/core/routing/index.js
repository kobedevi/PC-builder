const PossibleRoutes = Object.freeze({
  splash: "/splash",
  Login: "/login",

  Builder: "/builder",

  Users: "/users",
  UsersEdit: "/users/edit",

  PartsOverview: "/",

  HomeParent: "/home/*",
  Home: "/home",

  Create: "create",
  Detail: ":id",
  Edit: ":id/edit",

  Crud: "/crud/",
  CrudParent: "/crud/*",

  CpuParent: "/cpu/*",
  Cpus: "/crud/cpu",
  CpuEdit: "/crud/cpu/:id/edit",

  CpuCoolerParent: "/cpucooler/*",
  CpuCoolers: "/crud/cpucooler",
  CpuCoolerEdit: "/crud/cpucooler/:id/edit",

  MotherboardParent: "/motherboard/*",
  Motherboards: "/crud/motherboard",
  MotherboardEdit: "/crud/motherboard/:id/edit",

  CaseParent: "/case/*",
  Cases: "/crud/case",
  CaseEdit: "/crud/case/:id/edit",

  RamParent: "/ram/*",
  Ram: "/crud/ram",
  RamEdit: "/crud/ram/:id/edit",

  GpuParent: "/gpu/*",
  Gpus: "/crud/gpu",
  GpuEdit: "/crud/gpu/:id/edit",
  GpuPartnerDetail: "partner/:id",
  GpuPartnerEditRouter: "partner/:id/edit",
  GpuPartnerEdit: "/crud/gpu/partner/:id/edit",

  PsuParent: "/psu/*",
  Psus: "/crud/psu",
  PsuEdit: "/crud/psu/:id/edit",
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
