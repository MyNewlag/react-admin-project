
import React, { useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { Form, Formik } from 'formik'
import FormikControl from '../../components/form/FormikControl';
import SumbitBotton from '../../components/form/SumbitBotton';
import { initialValues, onSubmit, validationSchema } from './core';




export default function AddGuarantie({setData,editGuarantie,setEditGuarantie}) {
  
  const [reInitialize,setReInitialize]=useState(null)


  useEffect(()=>{
    if (editGuarantie) {
      setReInitialize({
        title:editGuarantie.title || "",
        descriptions:editGuarantie.descriptions || "",
        length:editGuarantie.length || "",
        length_unit:editGuarantie.length_unit || "",
      })
    }else{
      setReInitialize(null)
    }
  },[editGuarantie])

  return (
    <div>
         <button className="btn btn-success d-flex justify-content-center align-items-center" 
            data-bs-toggle="modal" data-bs-target="#add_guarantee_modal"
            onClick={()=>setEditGuarantie(null)}>
             <i className="fas fa-plus text-light"></i>
          </button>
    
  <ModalsContainer
    fullScreen={false}
    id="add_guarantee_modal"
  title={editGuarantie ? "ویرایش گارانتی":"افزورن گارانتی جدید"}
  >

            <div className="container">
                <div className="row justify-content-center">
    <Formik
    initialValues={reInitialize || initialValues}
    onSubmit={(values,actions)=>onSubmit(values,actions,setData,editGuarantie)}
    validationSchema={validationSchema}
    enableReinitialize
    >

        <Form>

                <FormikControl
                control="input"
                type="text"
                name="title"
                label="عنوان گارانتی "
                placeholder="فقط حروف و عدد"
                />

      
                <FormikControl
                control="textarea"
                name="descriptions"
                label=" توضیحات گارانتی "
                 placeholder="فقط حروف و عدد"
                />
      
                <FormikControl
                control="input"
                type="number"
                name="length"
                label="مدت گارانتی "
                placeholder="  " 
                 />

                <FormikControl
                control="input"
                type="text"
                name="length_unit"
                label="نوع گارانتی "
                placeholder="نوع گارانتی" 
                 />

                             
                <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                     <SumbitBotton/>
                </div>
               
              </Form>
            </Formik>
            </div>
        </div>
    
 </ModalsContainer>
</div>
  )
}
