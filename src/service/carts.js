import httpService from "./httpService"

export const getAllCartsService=(page, countOnPage, searchChar)=>{
    return httpService(`/admin/carts?page=${page}&count=${countOnPage}&searchChar=${searchChar}` , "get")
}

  export const addNewCartService = (data) => {
    return httpService("/admin/carts", "post", data);
  };

export const deleteCartService=(id)=>{
    return httpService(`/admin/carts/${id}` , "delete")
}

export const editCartService=(id,data)=>{
    return httpService(`/admin/carts/${id}` , "put" , data)
}

export const getOneCartService=(id)=>{
    return httpService(`/admin/carts/${id}` , "get" )
}

