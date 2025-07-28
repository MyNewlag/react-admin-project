
import * as yup from "yup";
import { addNewUserService, editUserService } from "../../service/users";
import { Alert } from "../../utils/Alert";
import { convertDateToMiladi } from "../../utils/convertDate";

export const onSubmit =async (values,action,setData,userId)=>{
    console.log(values);
     values={...values ,
            birth_date:values.birth_date ? convertDateToMiladi(values.birth_date) : null
            }
    
    if (userId) {
        const res=await editUserService(userId,values)
        if (res.status==200) {
            Alert("موفقیت",res.data.message,"success")
            setData(old=>{
                let newData = [...old]
                let index=newData.findIndex(i=>i.id==userId)
                newData[index]=res.data.data
                return newData             
            })
        }
    }else{
        const res = await addNewUserService(values)
        if (res.status == 201) {
            Alert('انجام شد', res.data.message, 'success')
            action.resetForm();
            setData(old=>[...old, res.data.data])
        }
    }
}

export const initialValues ={
    user_name: "",
    first_name: "",
    last_name: "",
    phone: "",
    email: "",
    password: "",
    birth_date: "",
    gender: 1,
    roles_id: []
}

export const validationSchema =yup.object({
        user_name : yup.string().required("لطفا این قسمت را پر کنید")
            .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
        first_name : yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
        last_name : yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),

        password : yup.string().when("isEditing",{
           is:true,
           then:()=> yup.string()
            .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود") ,
           otherwise :()=>  yup.string(). required("لطفا این قسمت را پر کنید")
            .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-_.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
        }),
       
        phone : yup.number().typeError("فقط عدد وارد کنید").required("لطفا این قسمت را پر کنید"),
        email : yup.string().email("لطفا فرمت ایمیل را رعایت کنید"),
        birth_date : yup.string().matches(/^[0-9/\ \s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
        gender : yup.number(),
        roles_id : yup.array().min(1, "حد اقل یک مورد انتخاب کنید"),
    }
)

