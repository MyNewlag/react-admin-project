import httpService from "./httpService"

export const getAllBrandsService=()=>{
    return httpService(`/admin/brands`,'get')
}


export const newBrandService=(data)=>{
    if(data.logo){
          let formData = new FormData();

           formData.append('original_name' , data.original_name);
        formData.append('persian_name' , data.persian_name);
        formData.append('descriptions' , data.descriptions);
        formData.append('logo' , data.logo);
        data = formData;
    }
    return httpService('/admin/brands' , 'post' , data)
}


export const editBrandsServices=(id,data)=>{
        if(data.logo){
        let formData=new FormData()

            formData.append("original_name",data.original_name)
            formData.append("persian_name",data.persian_name)
            formData.append("descriptions",data.descriptions)
            formData.append("logo",data.logo)

        data=formData;
    }
    return httpService(`/admin/brands/${id}`,'post' , data)
}


export const deleteBrandService=(id)=>{
     return httpService(`/admin/brands/${id}`,'delete' )
}