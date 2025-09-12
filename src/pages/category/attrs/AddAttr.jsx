
import React from 'react'
import { Form, Formik } from "formik";
import { initialValues, onSubmit, validationSchema } from "./coreAttr";
import FormikControl from '../../../components/form/FormikControl';
import SubmitBotton from '../../../components/form/SubmitBotton';

                       
          
    export default function AddAttr({reInitialValue,location
    ,setData,editAttribute,setEditAttribute}) {
    return (
    <Formik
        initialValues={reInitialValue || initialValues}
        onSubmit={(values,action)=>onSubmit(values,action,location.state.categoryData.id
            ,setData,editAttribute,setEditAttribute
        )}
        validationSchema={validationSchema}
        enableReinitialize
        >

            <Form>
            <div className={`row my-3 ${editAttribute ? "alert-danger danger_shadow" : ""}
            justify-content-center align-items-center`}>

                <FormikControl
                className="col-md-6 col-lg-4 my-1"
                control="input"
                name="title"
                type="text"
                label="عنوان"
                placeholder="عنوان ویژگی جدید"
                />

                
                <FormikControl
                className="col-md-6 col-lg-4 my-1"
                control="input"
                name="unit"
                type="text"
                label="واحد"
                placeholder="واحد ویژگی جدید"
                />


            <div className="col-8 col-lg-2 my-1 d-flex justify-content-center align-items-center p-0 h-100">
                <FormikControl
                control="switch"
                name="in_filter"
                label="نمایش در  فیلتر"
                />                           
            </div>

            <div className="col-4 col-lg-2 d-flex justify-content-center align-items-start my-1">
                <SubmitBotton/>
                {
                editAttribute ?
                <button className=' byn btn-sm btn-secondary'
                onClick={()=>setEditAttribute(null)}>انصراف</button>
                : null
                }
            </div>
        </div>
            </Form>
        </Formik>
    )
    }
    