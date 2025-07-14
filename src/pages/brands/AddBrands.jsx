
import React, { useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { Form, Formik } from 'formik'
import FormikControl from '../../components/form/FormikControl';
import SubmitBotton from '../../components/form/SubmitBotton';
import { initialValues, onSubmit, validateSchema } from './core';
import { apiPath } from '../../service/httpService';


export default function AddBrands({setData,brandToEdit,setBrandToEdit}) {

  const [reInitValues,setReInitValues]=useState(null)



  useEffect(()=>{
    if (brandToEdit) {
      setReInitValues({
        original_name :brandToEdit.original_name,
        persian_name :brandToEdit.persian_name || "",
        descriptions :brandToEdit.descriptions || "",
        logo :null
      })
    }else{
       setReInitValues(null)
    }
  },[brandToEdit])
  

  return (
           
    <div>
         <button className="btn btn-success d-flex justify-content-center align-items-center" 
            data-bs-toggle="modal" data-bs-target="#add_brand_modal"
            onClick={()=> setBrandToEdit(null)}>
            <i className="fas fa-plus text-light"></i>
        </button>

    <ModalsContainer
    fullScreen={false}
    id="add_brand_modal"
    title={brandToEdit ? "ویرایش برند" : "افزورن برند جدید"}
    >

        <Formik
        initialValues={reInitValues||initialValues}
        onSubmit={(values,actions)=>onSubmit(values,actions,setData,brandToEdit)}
        validationSchema={validateSchema}
        enableReinitialize
        >

           <Form>
             <div className="container">
                <div className="row justify-content-center">

                <FormikControl
                control="input"
                type="text"
                name="original_name"
                label="عنوان لاتیتن برند "
                placeholder="کیبرد را در حالت لاتین قرار دهید "
                />

                <FormikControl
                control="input"
                type="text"
                name="persian_name"
                label="عنوان فارسی برند "
                placeholder="کیبرد را در حالت فارسی قرار دهید "
                />

                <FormikControl
                control="input"
                type="text"
                name="descriptions"
                label="توضیحات برند"
                placeholder="متن کوتاه در مورد برند"
                />

                {
                  brandToEdit ?(
                    <div className='btn_box text-center col-12 py-3'>
                      <img src={apiPath+"/"+brandToEdit.logo} width="60"/>
                    </div>
                  ): null
                }

                <FormikControl
                control="file"
                name="logo"
                label="تصویر "
                placeholder="متن کوتاه در مورد برند"
                />
                
                </div>
            </div>
                                         
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                    <SubmitBotton/>
                </div>

           </Form>

        </Formik>

    </ModalsContainer>
    </div>
  )
}
