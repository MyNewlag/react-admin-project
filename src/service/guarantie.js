import httpService from "./httpService"

export const getAllGuarantieServices=()=>{
    return httpService('/admin/guarantees' , 'get')
}


export const addGuarantieServices=(data)=>{
    return httpService('/admin/guarantees' , 'post' ,data)
}


export const editGuarantieServices=(id,data)=>{
    return httpService(`/admin/guarantees/${id} `, 'put' ,data)
}

export const deleteGuarantieServices=(id)=>{
    return httpService(`/admin/guarantees/${id}` , 'delete' )
}

