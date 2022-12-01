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
  // MoviesCreate: '/movies/create',
  // MoviesEdit: '/movies/:id/edit',
  // MoviesCreateReview: '/movies/:id/review',

  Motherboards: "/motherboard",
  MotherboardCreate: "/motherboard/create",
  MotherboardDetail: "/motherboard/:id",
  // DirectorsEdit: '/directors/:id/edit',
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
