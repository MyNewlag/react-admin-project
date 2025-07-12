import httpService from "./httpService"

export const getProductsService=(page,countOnPage,searchChar)=>{
    return httpService(`/admin/products?page=${page}&count=${countOnPage}&searchChar=${searchChar}`,'get');
}

export const deleteProductsService=(id)=>{
    return httpService(`/admin/products/${id}`,'delete');
}