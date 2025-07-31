

import React, { useEffect, useState } from 'react'
import ModalsContainer from '../../components/ModalsContainer'
import { useLocation, useNavigate, useOutletContext } from 'react-router-dom'
import { Form, Formik } from 'formik'
import { initialValues, onSubmit, validationSchema } from './core'
import FormikControl from '../../components/form/FormikControl'
import SubmitBotton from '../../components/form/SubmitBotton'
import { getOneDeliveryServices } from '../../service/deliveries'

export default function AddDelivery() {
    const navigate=useNavigate()
    const location=useLocation()
    const rowData=location.state?.deliveryToEdit

    
    const {setData}= useOutletContext()

    const [reInitialValues , setReInitialValues]=useState(null)

console.log(initialValues);

    const handleGetOneDelivery=async()=>{
        const res=await getOneDeliveryServices(rowData.id)
        if (res.status==200) {
            setReInitialValues(res.data.data)
        }
    }
    
    useEffect(()=>{
        if (rowData) {
            // handleGetOneDelivery()
            setReInitialValues(rowData)
        }
    },[rowData])
        

  return (
    <>

    <ModalsContainer
     className="show d-block"
    fullScreen={false}
    id="add_delivery_modal"
    title="افزورن تخفیف جدید"
    closeFunction={()=>navigate(-1)}
    >
            <div className="container">

                    <Formik
                    initialValues={reInitialValues || initialValues}
                    onSubmit={(values,action)=>onSubmit(values,action,setData,rowData)}
                    validationSchema={validationSchema}
                    enableReinitialize
                    >
                    
                    <Form>
                       <div className="row justify-content-center">
    
                        <FormikControl
                        control="input"
                        type="text"
                        placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                        name="title"
                        label="عنوان"
                        />

                        <FormikControl
                        control="input"
                        type="number"
                        name="amount"
                        label="مبلغ"
                        placeholder="فقط از اعداد استفاده کنید"
                        />

                        <FormikControl
                        control="input"
                        type="number"
                        name="time"
                        label="مدت ارسال"
                        placeholder="فقط از اعداد استفاده کنید"
                        />

                        <FormikControl
                        control="input"
                        type="text"
                        name="time_unit"
                        label="واحد مدت"
                        placeholder="فقط از حروف فارسی و لاتین استفاده کنید"
                        />

                        <div className="btn_box text-center col-12 col-md-6 col-lg-8 mt-4">
                                <SubmitBotton/>
                        </div>
                        
                </div>
                        </Form>
                    </Formik>
            </div>
    </ModalsContainer>
    </>
  )
}
