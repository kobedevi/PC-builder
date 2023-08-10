import roles from "./constants";

const isAdmin = (user) => {
  return user.role === roles.admin || user.role === roles.superAdmin;
};

const isSuperAdmin = (user) => {
  return user.role === roles.superAdmin;
};

export {
  isAdmin,
  isSuperAdmin
};
