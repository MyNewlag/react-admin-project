import { convertDataToFormdata } from "../utils/convertData";
import httpService from "./httpService"

export const getProductsService=(page,countOnPage,searchChar)=>{
    return httpService(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,'get');
}

export const deleteProductsService=(id)=>{
    return httpService(`/admin/products/${id}`,'delete');
}


export const addProductsService=(data)=>{
    return httpService(`/admin/products`,'post' , data.image ? convertDataToFormdata(data) : data);
}


export const editProductsService=(id,data)=>{
    return httpService(`/admin/products/${id}`,'put' ,data)}

export const addProductsAttributeService=(id,data)=>{
    return httpService(`/admin/products/${id}/add_attr`,'post' ,data)}
