import roles from "./constants";

const isAdmin = (user) => {
  return user.role === roles.admin;
};

const isSuperAdmin = (user) => {
  return user.role === roles.admin;
};

export {
  isAdmin,
  isSuperAdmin
};
