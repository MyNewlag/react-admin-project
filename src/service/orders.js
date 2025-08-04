import httpService from "./httpService"

export const getAllOrdersService=(page, countOnPage, searchChar)=>{
    return httpService(`/admin/orders?page=${page}&count=${countOnPage}&searchChar=${searchChar}` , "get")
}

export const getOneOrdersService=(id)=>{
    return httpService(`/admin/orders/${id}` , "get")
}

export const addNewOrdersService=(data)=>{
    return httpService(`/admin/orders` , "post" ,data)
}

export const deleteOrdersService=(id)=>{
    return httpService(`/admin/orders/${id}` , "delete")
}

