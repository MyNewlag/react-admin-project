
import * as yup from "yup";
import { addNewOrdersService } from "../../service/orders";
import { convertDateToMiladi } from "../../utils/convertDate";
import { Alert } from "../../utils/Alert";



export const onSubmit=async(values,actions,navigate,handleGetAllOrders)=>{
    
    values ={
        ...values , pay_at:values.pay_at ? convertDateToMiladi(values.pay_at): null
    }

    const res=await addNewOrdersService(values)
    if (res.status==201) {
       Alert('انجام شد', res.data.message, 'success');
        navigate(-1)
        handleGetAllOrders()
    }
}


export const initialValues={
  cart_id: "",
  discount_id: "",
  delivery_id: "",
  address: "",
  phone: "",
  email: "",
  pay_at:"",
  pay_card_number:"",
  pay_bank: ""
}



export const validationSchema = yup.object().shape({
    cart_id : yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    discount_id : yup.number().typeError("فقط عدد وارد کنید"),
    delivery_id : yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    address : yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    phone : yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
    email : yup.string().email("فرمت ایمیل را رعایت کنید"),
    pay_at:yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[0-9/\ \s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
    pay_card_number : yup.number().typeError("فقط عدد وارد کنید"),
    pay_bank : yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
})