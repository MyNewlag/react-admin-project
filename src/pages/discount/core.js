
import * as yup from "yup";
import { addDiscountServic, updateDiscountServic } from "../../service/discounts";
import { Alert } from "../../utils/Alert";
import { convertDateToMoladi } from "../../utils/convertDate";
import jMoment from 'jalali-moment';



export const onSubmit = async (values, actions,setData,discontToEdit) => {
    values={...values ,
        expire_at:convertDateToMoladi(values.expire_at)
        }

        if (discontToEdit) {
          const res= await updateDiscountServic(discontToEdit.id,values)
            if (res.status==200) {
                Alert("موفقیت", res.data.message,"success")
                setData(old=>{
                    let newData=[...old]
                    let index = newData.findIndex(a=>a.id==discontToEdit.id)
                    newData[index]=res.data.data
                    return newData
                })
            }
        }else{
            const res=await addDiscountServic(values)
            if ( res.status==201) {
                Alert("موفقیت", res.data.message,"success")
        
                setData(old=>[...old , res.data.data])
            }
        }
    }


export const initialValues={
    title: "",
    code: "",
    percent: 0,
    expire_at: "",
    for_all: true,
    product_ids: "",
}


export const validationSchema=  yup.object(        {
        title: yup.string()
            .required("لطفا این قسمت را پر کنید")
            .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
        expire_at: yup.string()
            .required("لطفا این قسمت را پر کنید")
            .matches(/^[0-9/\ \s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
        code: yup.string()
            .required("لطفا این قسمت را پر کنید")
            .matches(/^[a-zA-Z0-9\s@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
        percent: yup.number().required("لطفا این قسمت را پر کنید"),
        for_all:yup.boolean(),
        product_ids: yup.string().when('for_all', {
            is: false,
            then:()=> yup.string().required("لطفا این قسمت را پر کنید").matches(/^[0-9\s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
    }),
}
)
   
