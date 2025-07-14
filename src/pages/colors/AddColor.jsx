

import React, { useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { FastField, Form, Formik } from 'formik'
import FormikControl from '../../components/form/FormikControl';
import SubmitBotton from '../../components/form/SubmitBotton';
import { initialValues, onSubmit, validationSchema } from './core';


export default function AddColor({editColor,setEditColor, setData}) {

    const [reinitializeValue,setReinitializeValue]=useState(null)
    const [colorPickerValue,setColorPickerValue]=useState("#000000")



    useEffect(()=>{
      if(editColor){    
        setColorPickerValue(editColor.code)
        setReinitializeValue({
          title:editColor.title ,
          code:editColor.code
        })
      }else{
        setColorPickerValue("#000")
        setReinitializeValue(null)
      }
    },[editColor])
    
    
    const handleChangeColorCodeField=(e , form)=>{
      setColorPickerValue(e.target.value)
      form.setFieldValue("code",e.target.value)
      
      // console.log(e.target.value);
    }

    const handleColor=()=>{
      setColorPickerValue("#000")
      setEditColor(null)

    }
    
    return (

    <div>
        <button className="btn btn-success d-flex justify-content-center align-items-center"
            data-bs-toggle="modal" data-bs-target="#add_color_modal"
             onClick={handleColor}>
            <i className="fas fa-plus text-light"
           ></i>
        </button>

            <ModalsContainer
                fullScreen={false}
                id="add_color_modal"
                title={editColor ? "ویرایش رنگ" : "افزودن رنگ جدید"}
                >

                <div className="container">
                    <div className="row justify-content-center">
                    <Formik
                    initialValues={reinitializeValue || initialValues}
                    onSubmit={(values,action)=>onSubmit(values,action,setData,editColor,setColorPickerValue)}
                    validationSchema={validationSchema}
                    enableReinitialize
                    >
                                
                       <Form>

                        <FormikControl
                        control="input"
                        type="text"
                        name="title"
                        label="نام رنگ "
                        placeholder=""
                        />

                         <FastField>
                  {({form}) => {
                    return (
                      <div className="col-12 d-flex align-items-center justify-content-start">
                        <label
                          htmlFor="exampleColorInput"
                          className="form-label m-0"
                        >
                          انتخاب رنگ
                        </label>
                        <input
                          type="color"
                          className="form-control form-control-color mx-3"
                          id="code"
                          name="code"
                          title="انتخاب رنگ"
                          value={colorPickerValue}
                          onChange={(e)=>handleChangeColorCodeField(e, form)}
                        />
                      </div>
                    );
                  }}
                </FastField>

                        <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                            <SubmitBotton/>
                        </div>

                       </Form>
                 </Formik>
                    </div>
                </div>
        </ModalsContainer>
    </div>
  )
}
