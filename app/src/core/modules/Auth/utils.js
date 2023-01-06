import roles from "./constants";

const isAdmin = (user) => {
  return user.role === roles.admin;
};

export default isAdmin;
