const PossibleRoutes = Object.freeze({
  splash: "/splash",
  Login: "/login",

  // LikedMovies: '/likedMovies',

  Users: "/users",
  UsersEdit: "/users/edit",

  PartsOverview: "/",

  Cpus: "/cpu",
  CpuCreate: "/cpu/create",
  CpuDetail: "/cpu/:id",

  CpuCoolers: "/cpucooler",
  CpuCoolerCreate: "/cpucooler/create",
  CpuCoolerDetail: "/cpucooler/:id",
  // MoviesCreate: '/movies/create',
  // MoviesEdit: '/movies/:id/edit',
  // MoviesCreateReview: '/movies/:id/review',

  Motherboards: "/motherboard",
  MotherboardCreate: "/motherboard/create",
  MotherboardDetail: "/motherboard/:id",

  Cases: "/case",
  CaseCreate: "/case/create",
  CaseDetail: "/case/:id",

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
