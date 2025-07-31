import { addDeliveryServices, editDeliveryServices } from "../../service/deliveries";
import * as yup from "yup";
import { Alert } from "../../utils/Alert";

export const onSubmit = async (values, actions, setData,rowData) => {
    
    if (rowData) {
        const res=await editDeliveryServices(rowData.id , values)
        if (res.status==200) {
            setData(oldData=>{
                let nweData=[...oldData]
                let index=nweData.findIndex(d=>d.id==rowData.id )
                nweData[index] = res.data.data
                return nweData
            })
        }
    }else{
        const res = await addDeliveryServices(values);
        console.log(res.status);
        if (res.status==201) {
            setData(lastData=>[...lastData , res.data.data])
            Alert("ثبت","گاراانتی با موفقیت اضافه شد","success")
            actions.resetForm()
      }
    }
}

export const initialValues = {
  title: "",
  amount: "",
  time: 1,
  time_unit: "روز",
};

export const validationSchema = yup.object({
  title: yup
    .string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
  amount: yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
  time: yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
  time_unit: yup
    .string()
    .required("لطفا این قسمت را پر کنید")
    .matches(
      /^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/,
      "فقط از حروف و اعداد استفاده شود"
    ),
});
