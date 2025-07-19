
import { Alert } from '../../../utils/Alert';
import { addProductsAttributeService } from './../../../service/products';


export const onSubmit=async (values,action,productId)=>{
    console.log(values);
    let data={}
    for (const key in values) {
        if (values[key]) {
            data={...data , [key]:{value:values[key]}}
        }
    }

 const res=await addProductsAttributeService(productId)  
    if (res.status==200) {
        Alert('انجام شد',res.data.message,'success')
    }
    
}
