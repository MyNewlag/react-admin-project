import * as yup from "yup";
import { addNewRolesService, editRolePermissionsService, editRoleService } from './../../service/users';
import { Alert } from "../../utils/Alert";


export const onSubmit=async (values,action,setData,roleIdToEdit,editType)=>{
console.log(values);
//  console.log(editType);

    if (editType=="role") {
        const res=await editRoleService(roleIdToEdit,values)
        if (res.status==200) {
             Alert("ثبت شد",res.data.message,"success")
            setData(old=>{
                let newData=[...old]
                let index=newData.findIndex(n=>n.id==roleIdToEdit)
               newData[index]=res.data.data
               return newData
            })
        }
    }else if (editType=="permissions") {
        const res=await editRolePermissionsService(roleIdToEdit,values)
        if (res.status==200) {
           Alert("ثبت شد",res.data.message,"success")
        }
    } else {
        const res=await addNewRolesService(values)
        if (res.status==201) {
            setData(old=>[...old , res.data.data])
            Alert("ثبت شد",res.data.message,"success")
            action.resetForm()
        }
    }

}

export const initialValues ={
    title: "",
    description: "",
    permissions_id: [],
}

export const validationSchema=  yup.object({
    title: yup.string().when('editPermissions',{
        is:true,
        then:null,
        otherwise:()=>yup.string().required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    }),
       
    description:  yup.string().when('editPermissions',{
        is:true,
        then:null,
        otherwise:()=>yup.string().required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    }),
    permissions_id: yup.array().min(1, "حد اقل یک مورد انتخاب کنید")
})
