const PossibleRoutes = Object.freeze({
  splash: "/splash",
  Login: "/login",
  Register: "/register",

  
  Users: "/users",
  UsersEdit: "/users/edit",
  
  PartsOverview: "/",
  
  Builder: "/builder",
  Builds: "/builds",
  HomeParent: "/home/*",
  Home: "/home",
  BuildDetail: "/build/:id",

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

  StorageParent: "/storage/*",
  Storage: "/crud/storage",
  StorageEdit: "/crud/storage/:id/edit",

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
// e.g. route('/projects/:id', { id : 9 }) -> /projects/9
export const route = (path, options = {}) => {
  Object.keys(options).forEach((key) => {
    path = path.replace(`:${key}`, options[key]);
  });
  return path;
};

export { PossibleRoutes };
