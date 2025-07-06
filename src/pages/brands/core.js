import { editBrandsServices, newBrandService } from "../../service/brands";
import { Alert } from "../../utils/Alert";
import * as yup from 'yup';


export const onSubmit=async(values,actions,setData,brandToEdit)=>{

    if (brandToEdit) {
        const res=await editBrandsServices(brandToEdit.id,values)
        if (res.status==200) {
              Alert(" موفقیت","برند با موفقیت ویرایش شد","success")
              setData(lastData=>{
                let newData=[...lastData]
                let index = newData.findIndex(d=>d.id==brandToEdit.id)
                newData[index]=res.data.data
                return newData
              })
              
            }
        }else{
            const res = await newBrandService(values)
            console.log(res);
            if (res.status==201) {
                Alert(" موفقیت","برند جدید ثبت شد","success")
                setData(lastData=>[...lastData,res.data.data])
            }
            actions.resetForm()
        }
    }


    export const initialValues={
    original_name:"",
    persian_name:"",
    descriptions:"",
    logo:null,
    }

    export const validateSchema=yup.object({
        original_name:yup.string().required("لطفا این قست را پر کنید").matches(/^[\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف انگلیسی  استفاده کنید"),
        persian_name:yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده کنید"),
        descriptions:yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
            "فقط از حروف و اعداد استفاده کنید"),
        logo: yup.mixed().nullable()
        .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
        !value ? true : value.size <= 500 * 1024
        )
        .test("format", "فرمت فایل باید jpg باشد", (value) =>
        !value ? true : value.type == "image/jpeg"
        ),
    });
