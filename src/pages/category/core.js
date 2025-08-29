

import * as yup from 'yup';
import { createNewCategoryService, editCategoryService } from '../../service/category';
import { Alert } from '../../utils/Alert';


export const initialValues={
    parent_id:"",
    title:"",
    descriptions:"",
    image:null,
    is_active:true,
    show_in_menu:true,
}

export const onSubmit = async (values, actions, setForceRender,editId) => {

  try {
    values = {
      ...values,
      is_active: values.is_active ? 1 : 0,
      show_in_menu: values.show_in_menu ? 1 : 0,
    };
   if (editId) {
     const res = await editCategoryService(editId,values)
     
     if (res.status == 200) {
       Alert('ثبت رکورد', res.data.message, 'success');
       setForceRender(last=>last+1)
      }
    }else{
      const res = await createNewCategoryService(values)
      console.log(values);
     if (res.status == 201) {
       Alert('ثبت رکورد', res.data.message, 'success');
       actions.resetForm();
       setForceRender(last=>last+1)
     }
   }
} catch (error) {
       Alert('ثبت رکورد', error.message, 'success');
  }
};


export const validationSchema =yup.object({
    parent_id:yup.number(),
    title:yup.string().required("لطفا این قست را پر کنید").matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده کنید"),
    descriptions:yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده کنید"),
     image: yup.mixed().nullable()
    .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
      !value ? true : value.size <= 500 * 1024
    )
    .test("format", "فرمت فایل باید jpg باشد", (value) =>
      !value ? true : value.type == "image/jpeg"
    ),
        is_active:yup.boolean(),
        show_in_menu:yup.boolean(),
});