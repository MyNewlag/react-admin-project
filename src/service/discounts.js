import httpService from "./httpService"

export const getAllDiscountServic=()=>{
    return httpService("/admin/discounts" , "get")
}

export const getAllProductTitletServic=()=>{
    return httpService("/admin/products/all_titles" , "get")
}

export const addDiscountServic=(data)=>{
    return httpService("/admin/discounts" , "post" ,data)
}

export const deleteDiscountServic=(id)=>{
    return httpService(`/admin/discounts/${id}` , "delete")
}

export const updateDiscountServic=(id,data)=>{
    return httpService(`/admin/discounts/${id}` , "put" ,data)
}