import httpService from "./httpService"

export const getAllPermissionsService=()=>{
    return httpService('/admin/permissions' , 'get')
}

export const getAllRolesService=()=>{
    return httpService('/admin/roles' , 'get')
}

export const addNewRolesService=(data)=>{
    return httpService('/admin/roles' , 'post' , data)
}


export const getSingleRoleService=(id)=>{
    return httpService(`/admin/roles/${id}` , 'get')
}

export const editRoleService=(id,data)=>{
    return httpService(`/admin/roles/${id}` , 'put' , data)
}

export const deleteRolesService=(id)=>{
    return httpService(`/admin/roles/${id}` , 'delete')
}

export const editRolePermissionsService=(id,data)=>{
    return httpService(`/admin/roles/${id}/permissions` , 'put' ,data)
}

