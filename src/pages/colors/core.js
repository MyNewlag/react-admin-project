
import * as yup from 'yup';
import { Alert } from '../../utils/Alert';
import { addColorsService, editColorsService } from '../../service/color';


     export const onSubmit=async(values,action,setData,editColor,setColorPickerValue)=>{
       // console.log(values);
    
          if (editColor) {
              const res=await editColorsService(editColor.id,values)
              
              if (res.status==200) {
                 setData((lastData) => {
                let newData = [...lastData];
                let index = newData.findIndex((d) => d.id == editColor.id);
                newData[index] = res.data.data;
                 return newData;
                  })
              Alert("موفقیت","رنگ با موفقیت ویرایش شد","success")
              }
          }else{
            setColorPickerValue("#000")
            const res=await addColorsService(values)
            if (res.status==201) {
              Alert("موفقیت","رنگ با موفقیت اضافه شد","success")
              setData(lastData=>[...lastData , res.data.data])
              action.resetForm()
              }
          }
      }
      
     export  const initialValues={
        title:"",
        code: ""
      }
  
       export const validationSchema=yup.object({
          title:yup.string().required("لطفا این قست را پر کنید")
              .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/, "فقط از حروف انگلیسی  استفاده کنید"),
            code: yup.string()
            .matches(/^[a-zA-Z0-9@!%$#?&]+$/,"فقط از اعداد و حروف استفاده شود")
      })


