import * as yup from "yup";

export const onSubmit = () => {};

export const initialValues = {
  category_ids: "",
  title: "",
  price: "",
  weight: null,
  brand_id: "",
  color_ids: "",
  guarantee_ids: "",
  descriptions: "",
  short_descriptions: "",
  cart_descriptions: "",
  image: null,
  alt_image: "",
  keywords: "",
  stock: null,
  discount: null,
};

export const validationSchema = yup.object({
  category_ids: yup
    .string()
    .required("لطفا این قمست را پر کنید")
    .matches(/^[0-9\s-]+$/, "فقط از حروف و اعداد استفاده کنید"),
  title: yup.string().required("لطفا این قمست را پر کنید"),
  price: yup.number().required("لطفا این قسمت را پر کنید"),
  weight: yup.number(),
  brand_id: yup.number(),
  color_ids: yup.string()
    .required("لطفا این قمست را پر کنید") .matches(/^[0-9\s-]+$/, "فقط از حروف و اعداد استفاده کنید"),
  guarantee_ids: yup .string() .required("لطفا این قمست را پر کنید") 
  .matches(/^[0-9\s-]+$/, "فقط از حروف و اعداد استفاده کنید"),
  descriptions: yup.string()
    .matches( /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده کنید"
    ),
  short_descriptions: yup.string() .matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده کنید"
    ),
  cart_descriptions: yup .string() .matches( /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده کنید"
    ),

  image: yup.mixed() .test("filesize", "حجم فایل نمیتواند بیشتر 500 کیلوبایت باشد", (value) =>
      !value ? true : value.size <= 500 * 1024
    ).test("format", "فرمت فایل باید jpg باشد", (value) =>
      !value ? true : value.type == "image/jpeg"
    ),
  is_active: yup.boolean(),
  show_in_menu: yup.boolean(),
  alt_image: yup.string().matches( /^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
      "فقط از حروف و اعداد استفاده کنید"
    ),
  stock: yup.number(),
  discount: yup.number(),
});
