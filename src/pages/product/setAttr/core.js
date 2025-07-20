
import { getCategoryAttrService } from '../../../service/categoryAttr';
import { Alert } from '../../../utils/Alert';
import { addProductsAttributeService, getOneProductService } from './../../../service/products';
import * as yup from "yup";



export const onSubmit=async (values,action,productId)=>{
    console.log(values);
    
    let data={}
    for (const key in values) {
        if (values[key]) {
            data={...data , [key]:{value:values[key]}}
        }
    }

    const res=await addProductsAttributeService(productId , data)  
        if (res.status==200) {
            Alert('انجام شد',res.data.message,'success')
            console.log(res.data.data);
        }
    }

    export const initializingData=async(selectedProduct)=>{

        let initials={}
        let rules={}
        const allAttributes=await Promise.all (
        selectedProduct.categories.map(async (cat)=>{
            const res=await getCategoryAttrService(cat.id)
            if (res.status==200) {
                if (res.data.data.length>0){
                    for (const d of res.data.data) {
                         const value=selectedProduct.attributes.filter(a=>a.id==d.id)[0]?.pivot.value || ""
                        initials={...initials , [d.id]:value}
                        rules={...rules , [d.id]: yup.string()
                            .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/
                            , "فقط از حروف و اعداد استفاده شود")}
                    }
                }
                return {groupTitle:cat.title , data:res.data.data}
            }else{
                return {groupTitle:cat.title , data:[]}
            }
                }))

                return {
                    allAttributes,
                    initials,
                    rules
                }
        }
