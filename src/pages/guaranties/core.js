
import * as yup from 'yup';
import { addGuarantieServices, editGuarantieServices } from '../../service/guarantie';
import { Alert } from '../../utils/Alert';


 export const onSubmit=async(values,actions,setData,editGuarantie)=>{

     
     if (editGuarantie) {
         const res=await editGuarantieServices(editGuarantie.id,values)
         if (res.status==200) {
               setData(lastData=>{
                let newData=[...lastData]
                let index = newData.findIndex(d=>d.id==editGuarantie.id)
                newData[index]=res.data.data
                return newData
              })
        Alert("ویرایش","گاراانتی با موفقیت ویرایش شد","success")
         }
        }else{
        const res=await addGuarantieServices(values)
        if (res.status==201) {
            setData(lastData=>[...lastData , res.data.data])
            Alert("ثبت","گاراانتی با موفقیت اضافه شد","success")
            actions.resetForm()
        }
    }
}

export const initialValues={
    title:"",
    descriptions:"",
    length:"",
    length_unit:""
}

 export const validationSchema=yup.object({
        title:yup.string().required("لطفا این قست را پر کنید").matches(/^[\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف انگلیسی  استفاده کنید"),
        descriptions:yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده کنید"),
        length:yup.number(),
        length_unit:yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده کنید")
    
    });