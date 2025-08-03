import httpService from "./httpService"

export const getAllCardsService=(page, countOnPage, searchChar)=>{
    return httpService(`/admin/carts?page=${page}&count=${countOnPage}&searchChar=${searchChar}` , "get")
}

  export const addNewCartService = (data) => {
    return httpService("/admin/carts", "post", data);
  };

export const deleteCardService=(id)=>{
    return httpService(`/admin/carts/${id}` , "delete")
}

export const editCardService=(id,data)=>{
    return httpService(`/admin/carts/${id}` , "put" , data)
}

