import httpService from "./httpService"

export const getAllGuarantieServices=()=>{
    return httpService('/admin/guarantees' , 'get')
}