

import React, { useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import * as yup from 'yup';
import { Form, Formik } from 'formik';
import FormikControl from './../../components/form/FormikControl';
import { getCategoriesService } from '../../service/getCategoriesService';
import { useParams } from 'react-router-dom';


const initialValues={
    parent_id:"",
    title:"",
    description:"",
    image:null,
    is_active:true,
    show_in_menu:true,
}


const onSubmit =(values)=>{
    console.log(values);
}


const validationSchema =yup.object({
    parent_id:yup.number(),
    title:yup.string().required("لطفا این قست را پر کنید").matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده کنید"),
    description:yup.string().required("لطفا این قست را پر کنید").matches(/^[\u0600-\u06FF\sa-zA-Z0-9@!%$?&]+$/,
        "فقط از حروف و اعداد استفاده کنید"),
     image:yup.mixed().test(
            "filesize",
            "حجم فایل نمیتواند بیشتر از 500 کیلو بایت باشد",
     (value)=>!value ?true :(value.size <= 500 *1024)
        )
        .test(
            "format",
            "فرمت فایل باید jpg باشد",
            (value)=>!value ?true : (value.type==="image/jpeg")
        ),
        is_active:yup.boolean(),
        show_in_menu:yup.boolean(),
});



export default function AddCategory() {
    
    const params=useParams()

    const [parents,setParents]=useState([])
    const [reInitialValue,setReInitialValue]=useState(null)

    const handleGetParentsCategories =async ()=>{
        try {
            const  res=await getCategoriesService()
            if (res.status==200) {
                const allParents=res.data.data

                setParents(
                    allParents.map(a=>{
                       return {id:a.id , value:a.title}
                    }))
                
            }
        } catch (error) {
            
        }
    }


    useEffect(()=>{
        handleGetParentsCategories()
    },[])

    useEffect(()=>{
        if(params.categoryId){
            setReInitialValue({
                ...initialValues,
                parent_id:params.categoryId
            })
        }else{
            setReInitialValue(null)
        }   
    },[params.categoryId])
    

  return (
    <>
     <button className="btn btn-success d-flex justify-content-center align-items-center"
          data-bs-toggle="modal" data-bs-target="#add_product_category_modal">
         <i className="fas fa-plus text-light"></i>
      </button>
    <ModalsContainer
         fullScreen={true}
         id="add_product_category_modal"
         title="افزورن دسته محصولات "
         >     

            <Formik
            initialValues={reInitialValue||initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
            enableReinitialize
            >

            <Form>
            <div className="container">
                <div className="row justify-content-center">

                {
                parents.length>0 ? (
                    <FormikControl
                    className="col-md-6 col-lg-8"
                    control="select"
                    options={parents}
                    name="parent_id"
                    label="دسته والد"
                    />
                    ):
                    null
                }
                

                <FormikControl
                className="col-md-6 col-lg-8"
                control="input"
                type="text"
                name="title"
                label="عنوان دسته "
                placeholder="عنوان دسته"
                />

                <FormikControl
                className="col-md-6 col-lg-8"
                control="textarea"
                name="description"
                label=" توضیحات "
                placeholder="توضیحات "
                />

                <FormikControl
                className="col-md-6 col-lg-8"
                control="file"
                name="image"
                label=" تصویر "
                placeholder="تصویر "
                />

                    <div className='col-12 col-md-6 col-lg-8 row justify-content-center'>
                        <div className='col-12 col-md-4 col-lg-3 mx-lg-5'>
                            <FormikControl
                            control="switch"
                            name="is_active"
                            label=" وضعیت فعال "
                            />
                        </div>
                        <div className='col-12 col-md-4 col-lg-3 mx-lg-5'>
                            <FormikControl
                            control="switch"
                            name="show_in_menu"
                            label="نمایش در منو"
                            />
                        </div>
                    </div>

                    <div className='btn_box text-center col-12 col-md-6 col-lg-8 mt-4'>
                        <button type="submit" className='btn btn-primary'>ذخیره</button>
                    </div>

                 </div>
             </div>
            </Form>
        </Formik>
    </ModalsContainer>
    </>
  )
}
