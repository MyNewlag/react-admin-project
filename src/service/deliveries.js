import httpService from "./httpService"

export const getAllDeliveriesServices=()=>{
   return httpService("/admin/deliveries" , "get")
}

export const getOneDeliveryServices=(id)=>{
   return httpService(`/admin/deliveries/${id}` , "get")
}

export const deleteDeliveryServices=(id)=>{
   return httpService(`/admin/deliveries/${id}` , "delete")
}

export const addDeliveryServices=(data)=>{
   return httpService("/admin/deliveries" , "post" , data)
}

export const editDeliveryServices=(id,data)=>{
   return httpService(`/admin/deliveries/${id}` , "put" , data)
}