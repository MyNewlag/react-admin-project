import * as yup from "yup";
import { Alert } from "../../utils/Alert";


export const onSubmit=async(values,actions,setSelectProducts,
    setSelectProductsInfo,curentProduct)=>{
        // console.log(values);
        // console.log(curentProduct);
            
        setSelectProducts(old=>[...old ,{...values}])
        actions.resetForm()
        actions.setFieldValue('user_id' , values.user_id)

        setSelectProductsInfo(old=>[...old ,{
            id:curentProduct.id+Math.random(),
            productName:curentProduct.title,
            price:curentProduct.price,
            guarantee:values.guarantee_id >0 ? curentProduct.guarantees.filter(g=>g.id==values.guarantee_id)[0].title : "yari",
            color:values.color_id > 0 ? curentProduct.colors.filter(c=>c.id==values.color_id)[0] : "asma",
            count:values.count
        }])
}


export const initialValues ={
    user_id:"",
    product_id:"",
    color_id:"",
    guarantee_id:"",
    count:""
}


export const validateSchema = yup.object({
    user_id:yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پرکنید"),
    product_id:yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پرکنید"),
    color_id:yup.number().typeError("فقط عدد وارد کنید"),
    guarantee_id:yup.number().typeError("فقط عدد وارد کنید"),
    count:yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پرکنید"),
})