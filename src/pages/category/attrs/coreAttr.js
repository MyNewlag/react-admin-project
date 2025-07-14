
import * as yup from 'yup';
import { Alert } from '../../../utils/Alert';
import { addCategoryAttrService, editCategoryAttrService } from '../../../service/categoryAttr';


    export const onSubmit=async(values,action,catId,setData,
        editAttribute,setEditAttribute)=>{
        try {
        values={
             ...values ,
             in_filter: values.in_filter ? 1 : 0
         }

        if (editAttribute){
            const res= await editCategoryAttrService(editAttribute.id,values)
           if(res.status==200){

            setData(oldData=>{
               const newData=[...oldData]
               const index=newData.findIndex(d=>d.id===editAttribute.id)
               newData[index]=res.data.data
               return newData
            })
          Alert("موفقیت",res.data.message,"success")
          setEditAttribute(null)
        }else{
            Alert("خطا","آیتم ویرایش نشد","error")
           }
            
        }else{
            const res=await addCategoryAttrService(catId,values)     
            if(res.status==201){
                setData(oldData=>[...oldData,res.data.data])
                Alert("اضافه شد","ویژگی به لیست اضافه شد","success")
                action.resetForm()
            }
         }
         } catch (error) {
            console.log(error.message);  
         }   
        }


    export const initialValues={
        title:"",
        unit:"",
        in_filter:""
    }

     export const validationSchema =yup.object({
        id:yup.number(),
        title:yup.string().required("لطفا این قست را پر کنید").matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده کنید"),
        unit:yup.string().required("لطفا این قست را پر کنید").matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده کنید"),
         in_filter:yup.boolean()
          
    });