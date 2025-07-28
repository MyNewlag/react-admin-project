import httpService from "./httpService";

export const getAllPermissionsService = () => {
  return httpService("/admin/permissions", "get");
};

export const getAllUsersService = (page, countOnPage, searchChar) => {
  return httpService(
    `/admin/users?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,
    "get"
  );
};

export const getAllRolesService = () => {
  return httpService("/admin/roles", "get");
};

export const addNewRolesService = (data) => {
  return httpService("/admin/roles", "post", data);
};

export const addNewUserService = (data) => {
  return httpService("/admin/users", "post", data);
};

export const getSingleRoleService = (id) => {
  return httpService(`/admin/roles/${id}`, "get");
};

export const getSingleUserService = (id) => {
  return httpService(`/admin/users/${id}`, "get");
};

export const editRoleService = (id, data) => {
  return httpService(`/admin/roles/${id}`, "put", data);
};

export const deleteRolesService = (id) => {
  return httpService(`/admin/roles/${id}`, "delete");
};

export const deleteUserService = (id) => {
  return httpService(`/admin/users/${id}`, "delete");
};

export const editRolePermissionsService = (id, data) => {
  return httpService(`/admin/roles/${id}/permissions`, "put", data);
};

export const editUserService = (id, data) => {
  return httpService(`/admin/users/${id}`, "put", data);
};
