import * as yup from "yup";
import { addProductsService } from "../../service/products";
import { Alert } from "../../utils/Alert";

export const onSubmit = async (values , action) => {
  const res=await addProductsService(values)
  console.log(res.status);
  
  if (res.status==201) {
    Alert('OK',res.data.message, 'success')
  }
};

export const initialValues = {
  category_ids: "",
  title: "",
  price: "",
  weight: "",
  brand_id: "",
  color_ids: "",
  guarantee_ids: "",
  descriptions: "",
  short_descriptions: "",
  cart_descriptions: "",
  image: "",
  alt_image: "",
  keywords: "",
  stock: "",
  discount: "",
};

export const validationSchema = yup.object({
    category_ids: yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[0-9\s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
    title: yup.string()
        .required("لطفا این قسمت را پر کنید")
        .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    price: yup.number()
        .required("لطفا این قسمت را پر کنید"),
    weight: yup.number(),
    brand_id: yup.number(),
    color_ids: yup.string().matches(/^[0-9\s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
    guarantee_ids: yup.string().matches(/^[0-9\s-]+$/,"فقط ازاعداد و خط تیره استفاده شود"),
    descriptions: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    short_descriptions: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    cart_descriptions: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    image: yup.mixed()
      .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
        !value ? true : value.size <= 500 * 1024
      )
      .test("format", "فرمت فایل باید jpg باشد", (value) =>
        !value ? true : value.type === "image/jpeg" || value.type === "image/png"
      ),
    alt_image: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    keywords: yup.string().matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%-.$?&]+$/, "فقط از حروف و اعداد استفاده شود"),
    stock: yup.number(),
    discount: yup.number(),
  });